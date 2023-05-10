import React from 'react'
import {
    Group,
    Avatar,
    Textarea,
    Button,
    ButtonGroup,
    FormItem,
    FormStatus
  } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon24PhotosStackOutline } from '@vkontakte/icons';

import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from '../../store/hooks';

import { userData } from '../../store/slices/auth';
import { useSelector } from 'react-redux';
import {RootState} from '../../store/store';

// @ts-ignore
import styles from './NewPost.module.css';
import { post } from '../../store/slices/userpage';

export type NewPostValues = {
    'postContent': string,
    'image': FileList
}

export interface INewPostProps {
    author: userData
}

export default function NewPost(props:INewPostProps) {
    const [isEdited, setIsEdietd] = React.useState<boolean>(false);
    const [isImgAdded, setIsImgAdded] = React.useState<boolean>(false);
    const [image, setImage] = React.useState<string|null>(null);
    const [formError, setFormError] = React.useState<string>('')
    const fileInput = React.useRef<HTMLInputElement>()

    const dispatch = useAppDispatch();
    const { register, handleSubmit, reset, formState: { errors }, setValue} = useForm<NewPostValues>({
        mode: 'all'
    });

    const postingStatus = useSelector((state: RootState) => state.userpage.postingStatus)
    React.useEffect(() => {
        if (postingStatus === 'ok') {
            handleRemoveImg();
            setValue('postContent', '')
            setIsEdietd(false)
            setIsImgAdded(false)
        }
        if (postingStatus === 'failed') {
            setFormError('Возникла ошибка при отправке');
        }
    }, [postingStatus])

    const onSubmit: SubmitHandler<NewPostValues> = async (d) => {
        const send = (img: string | ArrayBuffer | null) => {
            dispatch(post(JSON.stringify({
                author: props.author,
                text: d.postContent,
                image: img
            })));
        }

        if (fileInput?.current?.files?.length) {
            // @ts-ignore
            const file = fileInput.current.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                // @ts-ignore
                if (reader.result?.length > 5 * 1024 * 1024) {
                    setFormError('Максимальный размер картинки - 5Mb')
                }
                else send(reader.result);
            }
        }
        else { send(null); }
    }

    const textReg = register('postContent', {
        maxLength: { value: 1000, message: "Максимум 1000 символов" }
    });
    textReg.onChange = ({ target }) => {
        console.log('edited')
        return new Promise(() => {
            if (target.value) setIsEdietd(true);
            else setIsEdietd(false);
        })
    }

    const imageReg = register('image');

    imageReg.onChange = ({ target }) => {
        return new Promise(() => {
            setFormError('');
            const file = target.files[0];
            setImage(URL.createObjectURL(file));
            setIsImgAdded(true);
        })
    }

    const mergedRefs = (node: HTMLInputElement) => {
        fileInput.current = node
        imageReg.ref(node)
    }

    const dialogOpen = () => {
        fileInput?.current && fileInput.current.click();
    }

    const handleRemoveImg = () => {
        if (fileInput.current) fileInput.current.value = '';
        setIsImgAdded(false);
        setFormError('');
    }

    return (
        <Group>
            <form 
                className={styles.container} 
                onSubmit={handleSubmit(onSubmit)}
            >
                <Avatar 
                    src={props.author.img_url || ''} 
                    size={35}
                    className={styles.avatar}
                    initials={(props.author.first_name[0] + props.author.last_name[0]).toUpperCase()}
                />
                <div className={styles.textareaWrapper}>
                    <FormItem 
                        className={styles.formItem}
                        bottom={errors?.postContent && errors.postContent.message}
                        status={errors?.postContent ? 'error' : 'default'}>
                        <Textarea 
                            placeholder="Что у вас нового?" 
                            name={textReg.name}
                            onChange={textReg.onChange}
                            onBlur={textReg.onBlur}
                            getRef={textReg.ref}
                        />
                    </FormItem>
                    {isImgAdded && image && <img 
                        className={styles.preview} 
                        src={image} 
                        alt="preview"
                    />}
                    {(isEdited || isImgAdded) && (
                        <ButtonGroup mode="horizontal" gap="m" style={{ marginTop: 20 }}>
                        {(isEdited || isImgAdded) && (
                            <Button
                                className={styles.postBtn}
                                type="submit"
                                size='m'
                            >Опубликовать</Button>
                        )}
                        {isImgAdded && (
                            <Button
                                className={styles.postBtn}
                                size='m'
                                mode='secondary'
                                onClick={handleRemoveImg}
                                type='submit'
                            >Убрать картинку</Button>
                        )}
                    </ButtonGroup>
                    )}
                </div>
                <label className={styles.addImg}>
                    <input 
                        type="file" 
                        accept=".jpg, .png, .jpeg|image/*"
                        {...imageReg}
                        ref={mergedRefs}
                    />
                    <Button
                        mode='secondary'
                        size='m'
                        before={<Icon24PhotosStackOutline />}
                        onClick={dialogOpen}
                    ></Button>
                </label>
            </form>
            {formError && (
                <FormStatus mode="error">
                    {formError}
                </FormStatus>
            )}
        </Group>
    )
}

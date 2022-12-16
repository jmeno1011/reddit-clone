import axios from 'axios'
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import useSWR from "swr"
import { useAuthState } from '../../context/auth';

const SubPage = () => {

    const [onwSub, setOnwSub] = useState(false)
    const { authenticated, user } = useAuthState();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter()
    const subName = router.query.sub;

    const fetcher = async (url: string) => {
        try {
            const res = await axios.get(url);
            console.log(res);
            
            
            return res.data;
        } catch (error: any) {
            throw error.response.data
        }
    }
    const { data: sub, error } = useSWR(subName ? `/subs/${subName}` : null, fetcher)

    useEffect(() => {
        if (!sub || !user) return;
        setOnwSub(authenticated && user.username === sub.username)
    }, [sub])

    const uploadImage = async (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.files === null) return;

        const file = e.target.files[0];
        console.log('file',file);
        
        const formData = new FormData();
        formData.append("file", file)
        // !. -> 무조건 null이 아니다 단언!
        formData.append("type", fileInputRef.current!.name);
        try{
            await axios.post(`subs/${sub.name}/upload`, formData,{
                headers: {"Context-Type":"multipart/form-data"}
            })

        }catch(error){
            console.error(error);
        }
    }

    const onpenFileInput = (type: string) => {
        // if(!ownSub) return;
        const fileInput = fileInputRef.current;
        if (fileInput) {
            fileInput.name = type;
            fileInput.click();
        }
    }

    return (
        <>
            {sub &&
                <>
                    <div>
                        <input type={"file"} hidden={true} ref={fileInputRef} onChange={uploadImage} />
                        {/* 배너 이미지 */}
                        <div className='bg-gray-400'>
                            {sub.bannerUrl ? (
                                <div
                                    className='h-56'
                                    style={{
                                        backgroundImage: `url(${sub.bannerUrl})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                    onClick={() => onpenFileInput("banner")}>
                                </div>
                            ) : (
                                <div className='h-20 bg-gray-400' onClick={() => onpenFileInput("banner")}></div>
                            )}
                        </div>
                        {/* 커뮤니티 메타 데이터 */}
                        <div className='h-20 bg-white'>
                            <div className='relative flex max-w-5xl px-5 mx-auto'>
                                <div className='absolute' style={{ top: -15 }}>
                                    {sub.imageUrl && (
                                        <Image
                                            src={sub.imageUrl}
                                            alt="커뮤니티 이미지"
                                            width={70}
                                            height={70}
                                            className="rounded-full"
                                            onClick={() => onpenFileInput("image")} />
                                    )}
                                </div>
                            </div>
                            <div className='pt-1 pl-24'>
                                <div className='flex items-center'>
                                    <h1 className='text-3xl font-bold'>{sub.title}</h1>
                                </div>
                                <p className='text-sm font-bold text-gray-400'>
                                    /r/${sub.name}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* 포스트와 사이드바 */}
                    <div className='flex max-w-5xl px-4 pt-5 mx-auto'></div>
                </>
            }
        </>
    )
}

export default SubPage
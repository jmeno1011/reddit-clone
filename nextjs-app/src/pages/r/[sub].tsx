import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import useSWR from "swr"
import { useAuthState } from '../../context/auth';
import axios from 'axios'
import Sidebar from '../../components/SideBar';
import { Post } from '../../types';
import PostCard from '../../components/PostCard';

const SubPage = () => {
    const router = useRouter();
    const subName = router.query.sub;
    const [onwSub, setOnwSub] = useState(false)
    const { authenticated, user } = useAuthState();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data: sub, error, mutate } = useSWR(subName ? `/subs/${subName}` : null)

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

    let renderPosts;
    if(!sub) {
        renderPosts = <p className='text-lg text-center'>로딩중...</p>
    }else if(sub.posts.length === 0){
        renderPosts = <p className='text-lg text-center'>아직 작성된 포스트가 없습니다.</p>
    }else{
        renderPosts = sub.posts.map((post:Post)=>(
            <PostCard key={post.identifier} post={post} subMutate={mutate}/>
        ))
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
                    <div className='flex max-w-5xl px-4 pt-5 mx-auto'>
                        <div className='w-full md:mr-3 md:w-8/12'>{renderPosts}</div>
                        <Sidebar sub={sub}/>
                    </div>
                </>
            }
        </>
    )
}

export default SubPage
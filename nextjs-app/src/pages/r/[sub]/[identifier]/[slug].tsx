import axios from "axios";
import { useRouter } from "next/router";
import { Post } from "../../../../types";
import useSWR from "swr"

const PostPage = () => {
    const router = useRouter()
    const { identifier, sub, slug } = router.query
    const { data: post, error } = useSWR<Post>(identifier && slug ? `/posts/${identifier}/${slug}` : null)
    return (
        
    )
}

export default PostPage;
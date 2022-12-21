import axios from "axios";
import { useRouter } from "next/router";
import { Post } from "../../../../types";
import useSWR from "swr"

const PostPage = () => {
    const router = useRouter()
    const { identifier, sub, slug } = router.query
    const fetcher = async (url: string) => {
        try {
            const res = await axios.get(url);
            return res.data;
        } catch (err: any) {
            throw err.response.data;
        }
    }
    const { data: post, error } = useSWR<Post>(
        identifier && slug ? `/posts/${identifier}/${slug}` : null, fetcher
    )
    return (
        
    )
}

export default PostPage;
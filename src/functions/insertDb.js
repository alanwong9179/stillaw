import { doc, setDoc } from "firebase/firestore";
import { fireStoreDB } from "./fireBaseSetting";

export async function writeNewBlog(blogId){
    await setDoc(doc(fireStoreDB, "blogs", blogId), {
        content: '<H1>Test blog</H1>',
        title:'Test title',
    })
}


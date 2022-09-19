import { doc, setDoc } from "firebase/firestore";
import { fireStoreDB } from "./fireBaseSetting";
import moment from "moment";

export async function writeNewBlog(blogId, content, img, tag, title){

    let result;

    await setDoc(doc(fireStoreDB, "blogs", `${blogId}`), {
        content: content,
        title: title,
        imgUrl: img,
        tag: tag,
        time: new Date()
    }).then(()=> {
        result = true
    }).catch(err =>{
        console.log(err)
        result = false
    })

    return result 
}


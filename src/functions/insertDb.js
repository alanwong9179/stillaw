import { doc, setDoc } from "firebase/firestore";
import { fireStoreDB } from "./fireBaseSetting";
import moment from "moment";

export async function writeNewBlog(blogId, img, tag, key){

    let result;

    await setDoc(doc(fireStoreDB, "blogs", `${blogId}`), {
        imgUrl: img,
        tag: tag,
        time: new Date(),
        key: key
    }).then(()=> {
        result = true
    }).catch(err =>{
        console.log(err)
        result = false
    })

    return result 
}


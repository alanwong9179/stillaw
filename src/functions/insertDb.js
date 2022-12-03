import { doc, setDoc } from "firebase/firestore";
import { fireStoreDB } from "./fireBaseSetting";

export async function writeNewBlog(blogId, coverImgUrl, tag, key, title){

    let result;

    await setDoc(doc(fireStoreDB, "blogs", `${blogId}`), {
        imgUrl: coverImgUrl,
        tag: tag,
        time: new Date(),
        key: key,
        title: title
    }).then(()=> {
        result = true
    }).catch(err =>{
        console.log(err)
        result = false
    })

    return result 
}

export async function writeNewMurmur(blogId, coverImgUrl, tag, key, title){

    let result;

    await setDoc(doc(fireStoreDB, "murmur", `${blogId}`), {
        imgUrl: coverImgUrl,
        tag: tag,
        time: new Date(),
        key: key,
        title: title
    }).then(()=> {
        result = true
    }).catch(err =>{
        console.log(err)
        result = false
    })

    return result 
}


import { storage } from "./fireBaseSetting";
import { ref, getDownloadURL } from "firebase/storage";

export default function getMd(){

    const pathReference = ref(storage, 'markdown_blogs/jcenter.md')
    getDownloadURL(pathReference).then(url => {
        
    })


}
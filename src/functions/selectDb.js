import { fireStoreDB } from "./fireBaseSetting";
import { collection, getDocs, getDoc, doc} from "firebase/firestore"; 
import moment from "moment";

export async function getBlogs(type){
    let posts = []
    console.log()
    //type 0 = murmur , 1 = blog

    try{
        const querySnapshot = await getDocs(collection(fireStoreDB, type === 1 ?"blogs":"murmur"));
        querySnapshot.forEach((doc) => {
            let res_data = JSON.parse(JSON.stringify(doc.data()))

            posts.push({
                id: doc.id,
                date: moment(res_data.time.seconds*1000).format('YYYY-MM-DD'),
                time: moment(res_data.time.seconds*1000).format('HH:mm:ss'),
                tag: res_data.tag,
                title: res_data.title,
                imgUrl: res_data.imgUrl,
                content: res_data.content
            })
        });
    }catch(error){
        alert("Error in get blog list: " + error)
    }

    return posts.sort((a,b) => { return moment(b.date+' '+b.time) - moment(a.date+' '+a.time)})
}

export async function getPostDetails(postId){
    const docRef = doc(fireStoreDB, "blogs", postId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data()
        //console.log("Document data:", );
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
}   

export async function getMurDetail(postId){
    const docRef = doc(fireStoreDB, "murmur", postId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data()
        //console.log("Document data:", );
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
}   

export async function getLastestBlogId(){

    let currPostId = 0
    try{
        const querySnapshot = await getDocs(collection(fireStoreDB, "blogs"));
        querySnapshot.forEach((doc) => {
            if (parseInt(doc.id) > currPostId ){
                currPostId = parseInt(doc.id)
            } 
        });
    }catch(error){
        alert("Error in get blog ig: " + error)
    }
    return currPostId
}




export async function getMurId(){

    let currPostId = 0
    try{
        const querySnapshot = await getDocs(collection(fireStoreDB, "murmur"));
        querySnapshot.forEach((doc) => {
            if (parseInt(doc.id) > currPostId ){
                currPostId = parseInt(doc.id)
            } 
        });
    }catch(error){
        alert("Error in get blog ig: " + error)
    }
    return currPostId
}

import { fireStoreDB } from "./fireBaseSetting";
import { collection, getDocs, query, where, getDoc, doc} from "firebase/firestore"; 
import moment from "moment";

export async function getBlogs(){
    let posts = []

    try{
        const querySnapshot = await getDocs(collection(fireStoreDB, "blogs"));
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

    return posts
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



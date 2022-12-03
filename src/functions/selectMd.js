import { storage } from "./fireBaseSetting";
import { ref, getDownloadURL } from "firebase/storage";

export async function getMd(name) {
  const pathReference = ref(storage, `Blogs/${name}.md`);
  let markdownTxt = "";
  await getDownloadURL(pathReference).then(async (url) => {
    await fetch(url, { mode: "cors" })
      .then((res) => res.text())
      .then((result) => {
        markdownTxt = result;
      });
  });

  return markdownTxt;
}

export async function getMdMur(name) {
  const pathReference = ref(storage, `MurMur/${name}.md`);
  let markdownTxt = "";
  await getDownloadURL(pathReference).then(async (url) => {
    await fetch(url, { mode: "cors" })
      .then((res) => res.text())
      .then((result) => {
        markdownTxt = result;
      });
  });

  return markdownTxt;
}

export async function getImageLink(path){
  const pathReference = ref(storage, path);
  return await getDownloadURL(pathReference)
}

import { postModel } from '../models/Schema/postSchema.js';
export  const action = async (data)=>{
try {
    console.log('data===================>',data);
    const {postId,comment} = data
    const createCommentReplica = await postModel.findByIdAndUpdate({_id:postId},{$addToSet:{comments:comment}})
    console.log(createCommentReplica);
} catch (error) {
    console.error(error);
}
}
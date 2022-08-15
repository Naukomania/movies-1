import {useRouter} from "next/router"
import MainLayout from "../../components/layouts/Main"
import MovieDetail from "../../components/movies/Detail"
import Synopsis from "../../components/movies/Synopsis"
import MovieComment from "../../components/movies/Comment"
import {useEffect,useState} from "react"
import { API_URL } from "../../config"

const Movie =()=>{
  const [movie,setMovie]= useState()
  const [comments,setComments]=useState([])
   const router=useRouter() 
   const movie_id=router.query.movie_id
   
   useEffect(() => {
        if (!movie_id) {
            return
        }
        fetch(`${API_URL}/movies/${movie_id}`)
            .then((res) => res.json())
            .then((data) => {
                setMovie(data.item);
                setComments(data.comments)
            });
    }, [movie_id]);
 
  return(
    
        <MainLayout>
          <div className="row">
            
            <div className="col-md-9">
        
            {!!movie && <MovieDetail movie={movie} />}
            {!!movie && <Synopsis movie={movie} />}
            {!!comments.length && ( <div class="section-line">
                            <div class="section-head">
                                <h2 class="section-title text-uppercase">Comments</h2>
                            </div> 
                            {comments.map((comment,index)=>{
                            return <MovieComment comment={comment} key={index}/>
                            })

                          }
                            </div>)}
            </div>
            
            <div className="col-md-3"></div>
        
          </div>
        
        </MainLayout>
  )
}
export default Movie
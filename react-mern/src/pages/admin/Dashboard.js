
import React, {useEffect, useState} from "react";
import { Col, Row } from '@themesberg/react-bootstrap';

import { UserPost } from "../../components/Widgets";
const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const [posts, setPost] = useState([])
 

  useEffect(() => {
    var myHeaders = new Headers();
    // Update headers with the token
    myHeaders.append("x-access-token", `${user.token}`);

    const fetchPosts = ()=>{
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      fetch(`http://localhost:5000/api/post/allPost`, requestOptions)
        .then(response => response.text())
        .then((result) =>{
          console.log(result);
          let data = JSON.parse(result);
          console.log(data.data);
          setPost(data.data);
        })
        .catch(error => console.log('error', error));
  
    }
    fetchPosts();


  }, [user.token])
  return (
    <>
      <Row className="mt-4 p-3">

        <Col xs={12} xl={12} className="mb-4">
          <Row>
          <Col xs={12} sm={12} md={{span: 8, offset:2}} xl={{span: 8, offset:2}} className="mb-4">
              
              <Row>
                <Col className="d-block mb-4 mb-md-0">
                  <h1 className="h2 job-like-title">Users Post</h1>
                </Col>
              </Row>
              <Row>
                {(posts.length > 0) ? (
                    <Col xs={12} sm={12} xl={12} className="mb-4">
                      {posts.map(post => (
                        <UserPost id={post._id} title={post.title} createdAt={post.createdAt} description={post.description} userData={post.user_id}/>
                      ))}
                    </Col>
                  ): (
                    <Col xs={12} sm={12} xl={12} className="mb-4">
                        <p className="proposal-post-date line-height-1">
                            No Job Found
                        </p>
                    </Col>
                  )
                }
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default AdminDashboard;
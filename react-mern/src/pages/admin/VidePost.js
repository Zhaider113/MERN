
import React, { useCallback, useEffect, useState } from "react";
import { Card, Col, Row } from '@themesberg/react-bootstrap';
import { useParams, useHistory } from "react-router-dom";
import cogoToast from 'cogo-toast';
import moment from "moment";

const Offer = () => {
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('user'));
    const { id } = useParams();
    const [loading , setLoading]  = useState(true);
    const [postDetail , setPostDetail]  = useState([]);
    const [userDetail , setUserDetail]  = useState([]);
    const regex = /(<([^>]+)>)/ig;
    const removeTags =(text)=>{
        if(text !== undefined && text !== ''){
          return text.replace(regex, '');
        }
      } 

    const getPostDetail = useCallback(() => {
        try {
            if(id){
                if(loading){
                    var myHeaders = new Headers();
                    // Update headers with the token
                    myHeaders.append("x-access-token", `${user.token}`);
                    var requestOptions = {
                        method: 'GET',
                        redirect: 'follow'
                      };
                      
                      setLoading(false);
                      console.log(loading)
                      fetch(`http://localhost:5000/api/post/${id}`, requestOptions)
                        .then(response => response.text())
                        .then(result => {
                            let data = JSON.parse(result);
                            if(data.success) {
                                console.log(data.data)
                                setPostDetail(data.data);
                                setUserDetail(data.data.user_id)
                            }else{
                                cogoToast.error(data.message,{
                                    position: 'top-right',
                                    hideAfter: 3,
                                });
                                history.push("/admin")
                            }
                        })
                        .catch(error => {
                            cogoToast.error(error.message,{
                                position: 'top-right',
                                hideAfter: 3,
                            });
                            history.push("/admin")
                        });
                }
            }else{
                cogoToast.error("Post is not Valid..!",{
                    position: 'top-right',
                    hideAfter: 3,
                });
                history.push("/admin")
            }
        } catch (error) {
            cogoToast.error(error.message,{
                position: 'top-right',
                hideAfter: 3,
            });
        }
    
    }, [history, id, loading, user.token]);

    useEffect(() => {
        if(loading){
            getPostDetail();
        }
    },[loading, getPostDetail])

  return (
    <>
    <Row className="mt-4 p-4">

        <Col xs={12} sm={12} md={{span: 8, offset:2}} xl={{span: 8, offset:2}} className="mb-4">
            <Card border="light" className="shadow-sm">
                <Card.Body>
                    <Row>
                        <Col md={12} className="mb-3">
                            <h1 className="job-like-title submit-project-heading2">{postDetail.title}</h1>
                            <p className="job-title mb-1 mx-1">
                                <span className="budget"> 
                                    Posted By:&nbsp;
                                </span>
                                <span className="pe-1"> 
                                    {userDetail.name}
                                </span>
                                <span className="budget"> 
                                    On: &nbsp;
                                </span>
                                <span className="type-date">
                                    {moment(new Date(postDetail.createdAt)).fromNow()}
                                </span>
                            </p>
                        </Col>
                        <Col xs={12} sm={12} md={12} className="mt-3">
                            <p className="proposal-detail">{removeTags(postDetail.description)}</p>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    </Row>
    </>
  );
};
export default Offer;

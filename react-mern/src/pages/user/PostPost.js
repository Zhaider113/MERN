
import React, {useEffect, useState} from "react";
import { Col, Row, Card, Button, Form } from '@themesberg/react-bootstrap';
import { useHistory} from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import cogoToast from 'cogo-toast';

const PostJob = () => {
    const [user, setUser] = useState();
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [isSubmitting, setSubmitting] = useState(false);
    
    const history = useHistory();
    const postJob = ()=>{
        try {
            let errorMsg = false;
            setSubmitting(true);
            if(title === ""){
                cogoToast.error("Post Title Required!",{
                    position: 'top-right',
                    hideAfter: 3,
                }); 
                errorMsg = true;   
                setSubmitting(false);
            }
            
            if(detail === undefined && detail === ''){
                cogoToast.error("Post Detail Required!",{
                    position: 'top-right',
                    hideAfter: 3,
                });   
                errorMsg = true;    
                setSubmitting(false);
            }
            if(!errorMsg){
                
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                // Update headers with the token
                myHeaders.append("x-access-token", `${user.token}`);
                let jobDetail = {title: title, description: detail};
                
                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify(jobDetail),
                    redirect: 'follow'
                };
                fetch(`http://localhost:5000/api/post/add`, requestOptions)
                    .then(response => response.text())
                    .then((result) => {
                        let data = JSON.parse(result);
                        if(data.success) {
                            cogoToast.success(data.message,{
                              position: 'top-right',
                              hideAfter: 3,
                            });
                            history.push("/user");
                        }
                        else{
                            cogoToast.error(data.message,{
                                position: 'top-right',
                                hideAfter: 3,
                            });
                            setSubmitting(false);
                          }
                    })
            }else{
                errorMsg = false;   
                setSubmitting(false)
            }
            

        } catch (error) {
            cogoToast.error(error.message,{
                position: 'top-right',
                hideAfter: 3,
              });
              setSubmitting(false);
        }
    }

    
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
    },[]);

  return (
    
    <>
      <Row className="mt-4 p-4">

        <Col xs={12} sm={12} md={{span: 8, offset:2}} xl={{span: 8, offset:2}} className="mb-4">
        <h1 className="job-like-title submit-project-heading2">Add New Post</h1>
          <Card border="light" className="shadow-sm">
            <Card.Body>
                <Row>
                    <Col md={12} className="mb-3">
                        <Form.Group id="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control className="proposal-inputs" required type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title of Post" />
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={12} md={12} className="mt-3">
                        {/* <Form.Group id="document"></Form.Group> */}
                        <Form.Label>Write Description of Post</Form.Label>
                        <CKEditor
                            editor={ ClassicEditor }
                            data=""
                            placeholder="Write Description of Post"
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setDetail(data);
                            } }
                        />
                    </Col>
                    <Col xs={12} sm={12} md={{span: 4, offset: 8}} lg={{span: 4, offset: 8}} xl={{span: 4, offset: 8}} className="mt-3">
                      <Button disabled={isSubmitting} onClick={postJob} className="m-1 personal-tab-update">{isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}Submit Post</Button>
                    </Col>
                </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PostJob;
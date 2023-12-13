
import React, {useState, useEffect} from "react";
import { Col, Row, Card, Button, Form } from '@themesberg/react-bootstrap';
import { useHistory, useParams} from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import cogoToast from 'cogo-toast';

const EditPost = () => {
  let {id} = useParams();
  const user = JSON.parse(localStorage.getItem('user'));

    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [isSubmitting, setSubmitting] = useState(false);
    
    const history = useHistory();

    const editPost = ()=>{
        try {
            let errorMsg = false;
            setSubmitting(true)
            if(title === ""){
                cogoToast.error("Post Title Required!",{
                    position: 'top-right',
                    hideAfter: 3,
                }); 
                errorMsg = true;  
                setSubmitting(false) 
            }
            if(detail === undefined && detail === ''){
                cogoToast.error("Post Detail Required!",{
                    position: 'top-right',
                    hideAfter: 3,
                });   
                errorMsg = true;
                setSubmitting(false)    
            }
            if(!errorMsg){
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("x-access-token", `${user.token}`);
                let postData = {title: title, description: detail};
                
                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify(postData),
                    redirect: 'follow'
                };
                
                fetch(`http://localhost:5000/api/post/update/${id}`, requestOptions)
                    .then(response => response.text())
                    .then((result) => {
                        let data = JSON.parse(result);
                        if(data.success) {
                            cogoToast.success(data.message,{
                              position: 'top-right',
                              hideAfter: 3,
                            });
                            history.push("/user")
                          }
                          else{
                            cogoToast.error(data.message,{
                              position: 'top-right',
                              hideAfter: 3,
                            });
                            setSubmitting(false)
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
              setSubmitting(false)
        }
    }

    useEffect(() => {
        const regex = /(<([^>]+)>)/ig;
        const removeTags =(text)=>{
            if(text !== undefined && text !== ''){
            return text.replace(regex, '');
            }
        }
        var myHeaders = new Headers();
        // Update headers with the token
        myHeaders.append("x-access-token", `${user.token}`);
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch(`http://localhost:5000/api/post/${id}`, requestOptions)
          .then(response => response.text())
          .then((result) =>{
            let data = JSON.parse(result);
            console.log(data)
            if(data.success){
              setTitle(data.data.title)
             
              setDetail(removeTags(data.data.description))
            }else{
              cogoToast.error("Post Not Found...!",{
                position: 'top-right',
                hideAfter: 3,
              });
              history.push("/user")
            }
          })
          .catch(error => {
            cogoToast.error(error.message,{
              position: 'top-right',
              hideAfter: 3,
            });
            history.push('/user');
          });
      }, [history, id, user.token]);

  return (
    
    <>
      <Row className="mt-4 p-4">

        <Col xs={12} sm={12} md={{span: 8, offset:2}} xl={{span: 8, offset:2}} className="mb-4">
        <h1 className="job-like-title submit-project-heading2">Edit Post</h1>
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
                            data={detail}
                            placeholder="Write Description of Post"
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setDetail(data);
                            } }
                        />
                    </Col>
                    <Col xs={12} sm={12} md={{span: 4, offset: 8}} lg={{span: 4, offset: 8}} xl={{span: 4, offset: 8}} className="mt-3">
                      <Button disabled={isSubmitting} onClick={editPost} className="m-1 personal-tab-update">{isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}Update Post</Button>
                    </Col>
                </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default EditPost;
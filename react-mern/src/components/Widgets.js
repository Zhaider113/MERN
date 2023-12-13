
import React  from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card} from '@themesberg/react-bootstrap';
import cogoToast from 'cogo-toast';
import { generatePath, useHistory } from "react-router-dom";
import moment from "moment";

// User Dashboard Posts List
export const PostWidget = (props) => {
  const {id, title, createdAt, description} =  props;
  const regex = /(<([^>]+)>)/ig;
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'));
  const removeTags =(text)=>{
    if(text !== undefined && text !== ''){
      return text.replace(regex, '');
    }
  } 
  const editPost = (selectedId)=>{
    if(selectedId){
      history.push(generatePath("/edit-post/:id", { id: selectedId }));
    }
  }
  const deletePost = (selectedId)=>{
    if(selectedId){
      try {
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", `${user.token}`);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
            
            fetch(`http://localhost:5000/api/post/delete/${id}`, requestOptions)
              .then(response => response.text())
              .then((result) => {
                  let data = JSON.parse(result);
                  if(data.success) {
                      cogoToast.success(data.message,{
                        position: 'top-right',
                        hideAfter: 3,
                      });
                      window.location.reload();
                    }
                    else{
                      cogoToast.error(data.message,{
                        position: 'top-right',
                        hideAfter: 3,
                      });
                    }
              })
    } catch (error) {
        cogoToast.error(error.message,{
            position: 'top-right',
            hideAfter: 3,
          });
    }
    }
  }

  return (
    <Card border="light" className="shadow-sm mt-3">
      <Card.Body>
        <Row>
          <Col xs={10} sm={10} xl={10} >
            <h6 className="job-title">{title}</h6>
            <div className="text-muted small  mt-2">
              <p className="posted">
                <span className="type-date">
                - Posted {moment(new Date(createdAt)).fromNow()}
                </span>
              </p>
            </div>
          </Col>
          <Col xs={2} sm={2} xl={2}>
              <FontAwesomeIcon icon={faPencilAlt} className="edit-icon me-3 " onClick={()=> editPost(id)}/>
              <FontAwesomeIcon icon={faTrashAlt} className="delete edit-icon me-3 " onClick={()=> deletePost(id)}/>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} xl={12}>
            <p className="job-detail">
              {removeTags(description).substring(0,300)}...
            </p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

// User Post listing wedget
export const UserPost = (props) => {
  const {id, title, createdAt, description, userData} =  props;
  const regex = /(<([^>]+)>)/ig;
  const history = useHistory();
  const removeTags =(text)=>{
    if(text !== undefined && text !== ''){
      return text.replace(regex, '');
    }
  } 
  const viewDetail = (id)=>{
    if(id){
      history.push(generatePath("/view-post/:id", { id: id }));
    }
  }

  return (
    <Card.Link className="read-more" onClick={()=> viewDetail(id)}>
      <Card border="light" className="shadow-sm mt-3">
        <Card.Body>
          <Row>
            <Col xs={10} sm={10} xl={10} >
              <h6 className="job-title">{title}</h6>
              <div className="text-muted small  mt-2">
                <p className="posted">
                  <span className="budget"> 
                    Posted By:&nbsp;
                  </span>
                  <span className="pe-1"> 
                    {userData.name}
                  </span>
                  <span className="budget"> 
                    On: &nbsp;
                  </span>
                  <span className="type-date">
                    {moment(new Date(createdAt)).fromNow()}
                  </span>
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} xl={12}>
              <p className="job-detail">
                {removeTags(description).substring(0,300)}......
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Card.Link>
  );
};

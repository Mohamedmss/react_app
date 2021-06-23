import React  from "react";
import {Card} from "react-bootstrap";
import './UserCard.css'

const UserCard = (user) => {

    return (
        <Card className="col-md-3" style={{ display:'inline-flex',border:0 ,padding:'1rem'}}>
            <Card.Body className={'card-item-body'}>
                <div id="profileImage">{user.user.name.charAt(0)}</div>
                <div className="d-flex justify-content-between">
                    <div>
                        <Card.Title>
                            {user.user.name}
                        </Card.Title>
                        <Card.Subtitle className="text-muted mb-2">
                            {user.user.mobile_number}
                        </Card.Subtitle>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};
export default  UserCard
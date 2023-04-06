import React from 'react'
import Sidebar from './Sidebar'
import { ColumnDirective, ColumnsDirective, Filter, GridComponent } from '@syncfusion/ej2-react-grids';
import { Group, Inject, Page, Sort } from '@syncfusion/ej2-react-grids';
import '../../../node_modules/@syncfusion/ej2-base/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-calendars/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-popups/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
import "../../../node_modules/@syncfusion/ej2-react-grids/styles/material.css";
import axios from 'axios';
import inco from '../../assets/user.png'
import { Button } from 'react-bootstrap';
import ModalCentered from './ModalCentered';
import { ToastContainer } from 'react-toastify';
//import ModalCentered from './ModalCentered';
const Users = () => {
  const [user, setUser] = React.useState([])
  React.useEffect(() => {
    axios.get('http://localhost:3001/api/users').then((response) => {
      setUser(response.data)
    
    })
  }, []);

  let template = (props) => {

    const src = props.Avatar;

    return (<div>

      <img className='avatar' src={inco} alt={props.user_id} />

    </div>)

  }
  const pageSettings = { pageSize: 6 };

  return (
    <>
    
    <Sidebar></Sidebar>

      <div id='usersDashboard'>
      <div id='adminActions'>
        <ModalCentered title={"Add User"} />
        <ModalCentered title={"Edit User"} />
        <ModalCentered title={"Delete User"} />
      </div>
        <GridComponent dataSource={user} allowPaging={true} pageSettings={pageSettings}>
        <ColumnsDirective>
          <ColumnDirective headerText='Picture' template={template} width='55' textAlign="Center" />
          <ColumnDirective field='user_id' headerText='ID' width='100' />
          <ColumnDirective field='user_email' headerText='Email' width='100' />
          <ColumnDirective field='user_first_name' headerText='First Name' width='100' />
          <ColumnDirective field='user_last_name' headerText='Last Name' width='100' />
          <ColumnDirective field='user_role' headerText='Role' width='100' />
        </ColumnsDirective><Inject services={[Page]} />
      </GridComponent>
      </div>
      
      </>
  )
}

export default Users  
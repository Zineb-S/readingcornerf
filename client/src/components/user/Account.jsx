import axios from 'axios';
import React from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
import NavBar from '../homepage/Navbar';
const Account = () => {
  var currentUserID = localStorage.getItem('id')
  
  const [order, setOrder] = React.useState([])
  React.useEffect(() => {
    axios.get(`https://readingcornerb.herokuapp.com/api/user/history/${currentUserID}`).then((response) => {
      setOrder(response.data)
    console.log(currentUserID)
    })
  }, []);
  let template = (props) => {

    let date = props.order_date
      return (<div>
  
        <span> {date.slice(0, 10) + " at " + date.slice(11, 16)} </span>
  
      </div>)
  
    };
  const pageSettings = { pageSize: 6 };
  const sortSettings = {
    columns: [
      { field: 'order_id', direction: 'Ascending' }
    ]
  };
  const filterSettings = {
    columns: [
      { field: 'order_date', operator: 'greaterthan', value: '' }
    ]
  };
  const fname = localStorage.getItem('fname')
  const token = localStorage.getItem('token')
  const navigate = useNavigate();
  const navigateHome = () => {
    toast.success("See you later");
    navigate('/');
  };


  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const res2 = await axios.post("https://readingcornerb.herokuapp.com/api/logout",
        token //token 
        , {
          headers: {
            'authorization': `Bearer ${token}`
          }
        })
      if (res2) {
          // clear storage 
          localStorage.clear()
          window.location.reload()
        //navigateHome()
      }

    } catch (err) {
      console.log(err);
    }

  };

  
  
  return (
    <><div><h1>Welcome Back {fname}</h1></div><Button onClick={handleLogout} style={{float:'right'}}>logout</Button>


    <div id='userorders'>
      <h3> Purshasing History</h3>
      <GridComponent dataSource={order} allowPaging={true} pageSettings={pageSettings} filterSettings={filterSettings} allowSorting={true} sortSettings={sortSettings} allowFiltering={true} >
        <ColumnsDirective>
          <ColumnDirective field='order_id' headerText='Order ID' width='60' />
         
          <ColumnDirective field='order_books' headerText='Ordered Books' width='150' />
          <ColumnDirective field='order_total' headerText='Order Total' width='100' />
          <ColumnDirective field='order_date' template={template} headerText='Order Date' width='100' />
        </ColumnsDirective><Inject services={[Page,Sort, Filter, Group]} />
      </GridComponent>
      </div>
      
      <NavBar/></>
  )
}
 
export default Account
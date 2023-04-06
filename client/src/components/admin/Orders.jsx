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
import ModalCentered from './ModalCentered';
const Orders = () => {
  const [order, setOrder] = React.useState([])
  React.useEffect(() => {
    axios.get('http://localhost:3001/api/orders').then((response) => {
      setOrder(response.data)
    
    })
  }, []);
  let template = (props) => {

    let date = props.order_date
      return (<div>
  
        <span> {date.slice(0, 10) + " at " + date.slice(11, 16)} </span>
  
      </div>)
  
    };
  const pageSettings = { pageSize: 6 };
  return (
    <><Sidebar></Sidebar>
     <div id='usersDashboard'>
     <div id='adminActions'>
        <ModalCentered title={"Add Order"} />
        <ModalCentered title={"Edit Order"} />
        <ModalCentered title={"Delete Order"} />
      </div>
        <GridComponent dataSource={order} allowPaging={true} pageSettings={pageSettings} >
        <ColumnsDirective>
          <ColumnDirective field='order_id' headerText='Order ID' width='60' />
          <ColumnDirective field='user_id' headerText='User ID' width='60' />
          <ColumnDirective field='order_books' headerText='Ordered Books' width='150' />
          <ColumnDirective field='order_total' headerText='Order Total' width='100' />
          <ColumnDirective field='order_date' template={template} headerText='Order Date' width='100' />
        </ColumnsDirective><Inject services={[Page]} />
      </GridComponent>
      </div></>
  )
}

export default Orders
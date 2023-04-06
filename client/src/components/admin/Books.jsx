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
const Books = () => {
  const [book, setBook] = React.useState([])
  React.useEffect(() => {
    axios.get('https://readingcornerb.herokuapp.com/api/books').then((response) => {
      setBook(response.data)
    
    })
  }, []);

  let template = (props) => {

    const src = props.Avatar;

    return (<div>

      <img className='bookpic' src={props.book_picture} alt={props.book_picture} />

    </div>)

  }
  const pageSettings = { pageSize: 6 };

  return (
    <><Sidebar></Sidebar>
    <div id='usersDashboard'>
    <div id='adminActions'>
        <ModalCentered title={"Add Book"} />
        <ModalCentered title={"Edit Book"} />
        <ModalCentered title={"Delete Book"} />
      </div>
        <GridComponent dataSource={book} allowPaging={true} pageSettings={pageSettings}>
        <ColumnsDirective>
          <ColumnDirective field='book_picture' headerText='Picture' template={template} width='55' textAlign="Center" />
          <ColumnDirective field='book_id' headerText='ID' width='40' />
          <ColumnDirective field='book_title' headerText='Title' width='150' />
          <ColumnDirective field='book_author' headerText='Author' width='100' />
          <ColumnDirective field='book_genre' headerText='Genre' width='100' />
          <ColumnDirective field='book_price' headerText='Price' width='60' />
        </ColumnsDirective><Inject services={[Page]} />
      </GridComponent>
      </div></>
  )
}

export default Books
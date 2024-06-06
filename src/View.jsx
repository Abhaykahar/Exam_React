import React from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import './header.css'



const View = ({record,deleteUser,editUser,multitpleDelete,allDelete,multitpleStatus,allStatus,mstatus}) => {
  return (
    <>  


      <table class="table m-3 border p-5 shadow">
  <thead>

    <tr align="center">
      <th scope="col">#</th>
      <th scope="col">Your Name</th>
      <th scope="col">status</th>
      <th scope="col">Action</th>
      <th scope="col">
                            <button className='btn btn-sm btn-danger' onClick={() => allDelete()}>Delete</button>
                        </th>
                        <th>
                            <button className='btn btn-sm btn-success' onClick={() => allStatus()}>status</button>
                        </th>
    </tr>
  </thead>
  <tbody>
        {
            record.map((val,index)=>{
                return(
                    <tr key={val.id} align="center">
                        <td>{++index}</td>
                        <td>{val.name}</td>
                       <td>{val.status}</td>
                        <td>
                            <button className='btn btn-danger btn-sm me-2' style={{fontSize:"20px"}} onClick={() => deleteUser(val.id)}><MdDeleteForever />
</button>||
                            <button className='btn btn-primary btn-sm ms-2' style={{fontSize:"20px"}} onClick={() => editUser(val)}><FaEdit /></button>
                        </td>
                        <td>
                                        <input type="checkbox" onClick={(e) => multitpleDelete(val.id,e.target.checked)} />
                                    </td>
                                    <td>
                                        <input type="checkbox" checked={mstatus.includes(val.id)} onClick={(e) => multitpleStatus(val.id,e.target.checked)} />
                                    </td>
                    </tr>
                )
            })
        }
  </tbody>
</table>
    </>
  )
}

export default View


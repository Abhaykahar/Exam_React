import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import View from './View';

const Add = () => {

    const [name,setName]=useState("")
    const [record,setRecord]=useState([])
    const[edit,setEdit]=useState("")
    const [mdelet,setmdelet]=useState([])
    const [mstatus,setmStatus]=useState([])

    useEffect(()=>{
        let data=JSON.parse(localStorage.getItem('user')) || []
        setRecord(data);
    },[])

    const handle = (e) =>{
        e.preventDefault()

        if(!name){
            toast.error("All fill reuired...");
            return false;
        }

        let obj={
            id:Math.floor(Math.random()*1000),name,status:"deactive"

        }

        if(edit){
            update(edit.id,obj);
        }else{
            let newrecord=[...record,obj];
            localStorage.setItem('user',JSON.stringify(newrecord));
            toast.success("Add successfully...");
        setRecord(newrecord);
        }
    
        setName("");
    }

    const update = (id,update) =>{
        let up=record.map((val)=>{
            if(val.id == id){
                val.name = update.name;
            }
            return val;
        })
        localStorage.setItem('user',JSON.stringify(up));
        setRecord(up)
        toast("update successfully...");
        setEdit("")
        setName("")
    }

    const deleteUser = (id)=>{
        let d=record.filter((val)=> val.id != id);
        localStorage.setItem('user',JSON.stringify(d));
        setRecord(d);
        toast.error("delete successfully..");
    }
    const editUser =(id) =>{
        setEdit(id);
    }
    useEffect(()=>{
        setName(edit.name)
    },[edit])

    const multitpleDelete = (id,checked) =>{
        let all=[...mdelet];
        if(checked){
            all.push(id);
        }else{
            all=all.filter((val)=> val != id);
        }
        setmdelet(all);
    }
    const allDelete = () =>{
        if(mdelet.length === 0){
            toast("minimum 1 row selected...");
            return false;
        }

        let all=record.filter((val)=> !mdelet.includes(val.id));
        localStorage.setItem('user',JSON.stringify(all));
        setRecord(all);
    }
    const multitpleStatus =(id,checked) =>{
        let all=[...mstatus];
        if(checked){
            all.push(id);
        }else{
            all=all.filter((val)=> val != id);
        }
        setmStatus(all)
    }
    const allStatus =() =>{
        if(mstatus.length == 0){
            toast("minimum 1 row selected...");
            return false;
        }

        let allS=record.map((val)=>{
            if(mstatus.includes(val.id)){
                if(val.status === "active"){
                    val.status ="deactive"
                }else{
                    val.status ="active"
                }
            }
            return val;
        })
        localStorage.setItem('user',JSON.stringify(allS));
        setRecord(allS);
        setmStatus([]);
    }
  return (
    <>
      <div className="container mt-5">
        <div className="row">
            <div className="col-lg-12">
            <form align="center" onSubmit={handle} className='mt-5'>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='form-control' style={{width:"30%",margin:"0 auto",position:"relative"}} />
                <input type="submit" value={edit ? "Edituser" : "Adduser"} style={{position:"absolute",top:"172px",left:"844px",height:"38px",background:"black",color:"white",border:"none"}} />
            </form>
            </div>
            <div className="col-lg-12" style={{marginTop:"120px"}}>
                <View
                record={record}
                deleteUser={deleteUser}
                editUser={editUser}
                multitpleDelete={multitpleDelete}
                allDelete={allDelete}
                multitpleStatus={multitpleStatus}
                allStatus={allStatus}
                mstatus={mstatus}
                />
            </div>
        </div>
        <ToastContainer
position="top-right"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition: Bounce
/>
      </div>
    </>
  )
}

export default Add

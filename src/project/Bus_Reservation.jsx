import React, { Fragment } from "react";
import { useState,useEffect,useRef,useContext,useCallback,useMemo,useReducer} from "react";
import './BusReservation.css';
import { v4 as uuid } from "uuid";
const  Bus_Reservation =()=>{
    const [id,setid] = useState(0);
    const [TabelData,SetTabelData] = useState([]);
    const [editclick,seteditclick] =useState(false);
    const[editindex,setEditindex] =useState(" ");
    const [inputs, setinputs] = useState({
        uname :'',
        umobile:'',
        fromwhere:'',
        towhere:'',
        trate:'',
        nofticket:'',
        totalsum:'',
    });

    const  Cleardata =()=>{
        setinputs({uname :' ',umobile:' ',fromwhere:' ',towhere:'',trate:' ',nofticket:' ',totalsum:' ', });
    }

    const HandelChange =(e)=>{
        setinputs({...inputs,
        [e.target.name] : e.target.value,
        });
    };
   
    const HandelSubmit =(e) =>{
        e.preventDefault();
        if(editclick){
            const temtabledata = TabelData;
            console.log(temtabledata);
            Object.assign(temtabledata[editindex],inputs);
            SetTabelData([...TabelData]);
        }else{
         SetTabelData([...TabelData,inputs]);
         console.log(inputs);
         Cleardata();
        }
    }
    const HandelEdit =(id)=>{
        // const editTrans = TabelData.find((i)=>i.id ===id);
         const tempdata =TabelData[id];
        setinputs({
        uname :tempdata.uname,
        umobile:tempdata.umobile,
        fromwhere:tempdata.fromwhere,
        towhere:tempdata.towhere,
        trate:tempdata.trate,
        nofticket:tempdata.nofticket,
        totalsum:tempdata.totalsum });
        seteditclick(true);
    }
    const HandelDelete =(index)=>{
        const deleteTrans = TabelData.filter((to,id)=>  id !==index);
        SetTabelData([...deleteTrans]);
    }

    var Pune = [{
        destination :'Solapur',
        Price :400
        },
        {
        destination :'Koral',
        price:500
        },
        {
        destination :'Omerga',
        price :600
        }];
    var Solapur =[{
        destination:'Pune',
        price:400
        },
        {
          destination:'Koral',
          price:150  
        },
        {
          destination:'Omerga',
          price:200
        }];
    var Omerga =[{
            destination:'Koral',
            price:50
        },
        {
            destination:'Solapur',
            price:200
        },
        {
            destination:'Pune',
            price:600
        }];


    const addDestinations  = (event) =>{
        var fromlocation  = event.target.value;

					if(fromlocation == "Pune")
					{
						var fromlocationobj = Pune;
					}
					 else if (fromlocation == "Solapur")
					{
						fromlocationobj = Solapur;
					}
					else if(fromlocation == "Omerga")
					{
						fromlocationobj = Omerga;
					}
					else
					{
						alert("destination route is not defined");
						return;
					}

					for(var i=0; i < fromlocationobj.length; i++)
					{
						var optionNode = document.createElement("option");
						var optionattri =document.createAttribute("value");
						optionattri.value = fromlocationobj[i].destination
						optionNode.setAttributeNode(optionattri);

						var TextNode =document.createTextNode(fromlocationobj[i].destination);
						optionNode.appendChild(TextNode);

						document.getElementById("towhere").appendChild(optionNode);
						console.log(optionNode);
					}
                }
                function updatedestinations(updaevent)
				{
					var fromlocations=document.getElementById("fromwhere").value;
					var tolocations =document.getElementById("towhere").value;

					if(fromlocations == "Pune")
					{
						var fromlocationobj = Pune;
					}
					else if(fromlocations == "Solapur")
					{
						fromlocationobj =Solapur;
					}
					else if(fromlocations =="Omerga")
					{
						fromlocationobj = Omerga;
					}
					else
					{
						alert("destination route not is not defined ")
						return;
					}

					for(var i=0 ; i<fromlocationobj.length; i++)

 	  				if(fromlocationobj[i].destination == tolocations)
 	  				{
 	  					document.getElementById("txtrate").value = fromlocationobj[i].price;
 	  					return; 	  					
 	  				}

				}
					function destprice(event)
	 	  		{
	 	  			var tekitprice = document.getElementById("trate").value;
	 	  			var totaltekit = document.getElementById("nofticket").value;

	 	  			document.getElementById("totalsum").value=tekitprice*totaltekit;
	 	  			return;

	 	  		}
                // function  destprice(e) {
                    
                //     inputs.totalsum =  inputs.trate * inputs.nofticket;
                // }


  return (

        <Fragment> 
            <div style={{textAlign:'center'}}><h1>BUS TECKIT BOOKING APP</h1></div>
         <div className="wraper">
            <form  onSubmit={HandelSubmit}>
             <div className="item">
                <span className="input_label">Name</span>
                <span className="input_type"><input  type="text" name ="uname" id="uname" value={inputs.uname} onChange={HandelChange} /> </span>
             </div>
             <div className="item">
                <span className="input_label">Contact No</span>
                <span  className="input_type"><input  type="number" name ="umobile" id="umobile"value={inputs.umobile} onChange={HandelChange} /> </span>
             </div>
             <div className="item">
                <span className="input_label">journey</span>
                <span>Form:</span>
                <select name="fromwhere" id="fromwhere" value={inputs.fromwhere} onChange={addDestinations} > 
                    <option>Omerga</option>
                    <option>Solapur</option>
                    <option>Pune</option>
                </select>
                <span>To:</span>
              
                <select name="towhere" id="towhere" value={inputs.towhere} onChange={updatedestinations}> </select>
       
             </div>
             <div className="item">
                <span className="input_label">Rate</span>
                <span  className="input_type"><input  type="text" name ="trate" id="trate"  value={inputs.trate} onChange={HandelChange} /> </span>
             </div>
             <div className="item">
                <span className="input_label">Number of Teckits</span>
                <span  className="input_type"><input  type="number" name ="nofticket" id="nofticket" value={inputs.nofticket} onKeyUp={destprice}  onChange={HandelChange}/> </span>
             </div>
             <div className="item">
                <span className="input_label">Total Sum</span>
                <span  className="input_type"><input  type="text" name ="totalsum" id="totalsum" value={inputs.totalsum} onChange={HandelChange}  /> </span>
             </div>
             <div className="btn">
				<input type ="submit" name="btnAdd" id="btnAdd" value={editclick ?'Update':'Add'}/>
			</div>
            </form>
            <table id ="booking_table">
			<tr>
                <th>Name</th>
				<th>Contact Number</th>
				<th>From</th>
				<th>To</th>
				<th>Rate</th>
				<th>Number of Teckits</th>
				<th>Total Sum</th>
				<th>EDIT</th>
                <th>DELETE</th>
			</tr>
                { TabelData.map((t,id)=>(
                    <tr key={t.id}>
                        <td>{t.uname}</td>
                        <td>{t.umobile}</td>
                        <td>{t.fromwhere}</td>
                        <td>{t.towhere}</td>
                        <td>{t.trate}</td>
                        <td>{t.nofticket}</td>
                        <td>{t.totalsum}</td>
                        <td><a href onClick={()=>HandelEdit(id)}>EDIT</a></td>
                        <td><a href onClick={()=>HandelDelete(id)} >DELETE</a></td>
                    </tr>
                ))}
		</table>
        </div>
    </Fragment>
    

    
  )
}

export default Bus_Reservation

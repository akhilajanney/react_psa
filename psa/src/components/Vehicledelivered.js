import React, {Component} from 'react';
import $ from 'jquery';
// import axios from 'axios';
import axios from 'axios';


export default class Vehicledelivered extends Component {
    // componentDidMount=()=>{
    //     axios({
    //         method: "GET",
    //         url: "/api/uploadmap",
    //       })
    //         .then((response) => {
    //           console.log(response)
    //           })
    //           .catch((error) => {
    //              console.log(error)
    //     })
    // }
    componentDidMount(){
        axios({method:'PUT',url:'/api/vehicle/deliver'})
        .then((response)=>{
            console.log('delivered',response)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    render() {
        return (
            <>
                <div className='container'>
                    <div className="main">
                        <p className="heading">Vehicle Delivered Details</p>
                        <hr></hr>
                        <p id="message"></p>
                        <table style={
                            {
                                marginTop: "20px",
                                marginBottom: "30px"
                            }
                        }>
                            <thead>
                                <tr>
                                    <th>Sl .No</th>
                                    <th>CUSTOMER NAME</th>
                                    <th>CAR NUMBER</th>
                                    <th>PHONE NO.</th>
                                    <th>ADDRESS</th>
                                    <th>SERVICE NO.</th>
                                    <th>REGISTERED DATE</th>
                                    <th>DELIVERED DATE</th>
                                </tr>
                            </thead>
                            <tbody id="vehicle"></tbody>
                        </table>
                    </div>
                </div>

            </>
        )
    }
}

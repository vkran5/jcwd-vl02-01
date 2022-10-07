import React, { useEffect } from 'react';
import { MdLocationOn } from "react-icons/md";
import { getUser } from "../slices/userSlice";
import { useSelector } from 'react-redux'
import { useState } from 'react';
import { Select, useToast } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URL } from '../helper';
import { HiXCircle } from "react-icons/hi";
import { AiOutlineUpload } from "react-icons/ai";


const PrescriptionPage = (props) => {

    const [prescriptionImage, setPrescription] = useState('');
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [deliveryOption, setDeliveryOption] = useState([]);
    const [selectedDelivery, setSelectedDelivery] = useState('default-0');

    const user = useSelector(getUser);
    const toast = useToast();

    // Nanti ini pake params dr alamat
    let getDeliveryService = async () => {
        try {
            let token = Cookies.get('sehatToken');

            let resDelivery = await axios.get(API_URL + '/rajaongkir/get_delivery_option', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (resDelivery.data.success) {
                setDeliveryOption(resDelivery.data.option)
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDeliveryService();
    }, []);


    const printOption = () => {

        let print = deliveryOption.map((val, idx) => {
            return (
                <option key={idx} value={`${val.name} ${val.service}-${val.cost[0].value}`}>{`${val.name} ${val.service} - Rp. ${val.cost[0].value.toLocaleString('id')} (${val.cost[0].etd} days)`}</option>
            )
        })

        return print
    }


    const addImage = (e) => {
        if (e.target.files[0].type === 'image/png' || e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "image/jpg" || e.target.files[0].type === 'image/gif') {
            if (e.target.files[0].size > 1048576) {
                toast({
                    title: 'File uploaded is too big',
                    description: 'Max size is 1 MB',
                    position: 'top',
                    status: 'error',
                    duration: 3000,
                    isClosable: true
                })
            } else {
                setPrescription(e.target.files[0]);
                const reader = new FileReader();
                if (e.target.files[0]) {
                    reader.readAsDataURL(e.target.files[0])
                }

                reader.onload = (readEvent) => {
                    setSelectedImage(readEvent.target.result)
                }
            }
        } else {
            toast({
                title: 'Wrong file format',
                description: 'Your file format is not supported',
                position: 'top',
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        }



    }


    return (
        <div className='bg-bgWhite'>
            <div className='h-screen py-5 px-5 bg-white'>
                <div className='lg:flex justify-center container mx-auto mt-[2.5vh]'>
                    <div className='lg:w-3/5 lg:mx-5 container p-3 flex-col'>
                        <div className='border-b'>
                            <div className='flex pb-2 items-center'>
                                <MdLocationOn className='text-[24px] mr-3 text-hijauBtn' />
                                <p className='font-bold text-[24px] text-hijauBtn'>My Address</p>
                            </div>
                            <div className='py-3'>
                                <p className='font-bold text-hijauBtn'>{`${user.name} - ${user.phone_number}`}</p>
                                <p>Jl. Arumanis 1 No.58 Kelurahan Pataruman 44151 </p>
                                <p>Kabupaten Garut, Provinsi Jawa Barat </p>
                            </div>
                            <div className='flex lg:justify-end pb-3'>
                                <button className='mr-2 my-2 bg-hijauBtn hover:bg-white text-white hover:text-hijauBtn border w-[170px] h-[42px] font-bold '>
                                    Change Address
                                </button>

                                <button className='ml-2 my-2 bg-hijauBtn hover:bg-white text-white hover:text-hijauBtn border w-[170px] h-[42px] font-bold'>
                                    Add new address
                                </button>
                            </div>
                        </div>

                        {/* Prescription */}

                        <div className=' my-4' >
                            <div>
                                <p className='text-hijauBtn text-[24px] font-bold mb-3'>Upload prescription</p>
                                <div className='mx-auto border h-screen h-[300px] lg:h-[450px] lg:flex items-center'>
                                    {
                                        prescriptionImage ?
                                            <div className='mx-auto relative'>
                                                <p onClick={() => { setPrescription(''); setSelectedImage(null) }} className='p-2 absolute cursor-pointer'><HiXCircle /></p>
                                                <img src={selectedImage} className='object-contain h-[400px] p-6' alt="" />
                                            </div>
                                            :
                                            <div className='mx-auto'>
                                                <AiOutlineUpload className='mx-auto text-hijauBtn text-[120px]' />
                                                <p className='text-center text-muted text-[24px]'>Upload your prescription here</p>
                                                <div className='flex justify-center lg:mt-6'>
                                                    <input onChange={addImage} className='text-white lg:w-[125px] p-2 rounded file:border-none file:bg-btnHijau file:rounded file:text-black file:p-1 file:px-2 file:cursor-pointer' type="file" />
                                                </div>
                                            </div>
                                    }

                                </div>
                            </div>

                        </div>


                    </div>

                    {/* Checkout Component */}
                    <div className='lg:border lg:rounded lg:w-[350px] lg:h-[400px] px-5'>
                        <p className='hidden lg:block text-poppins text-hijauBtn font-bold pt-5 text-[24px] border-b pb-[16px]'>Order detail</p>

                        <div className='pt-5'>
                            <div className='py-1'>
                                <p className='py-2 text-hijauBtn'>Delivery option</p>
                                <Select onChange={(e) => setSelectedDelivery(e.target.value)} >
                                    <option value="default-0" selected>Select option</option>
                                    {printOption()}
                                </Select>
                            </div>

                            <div className='py-1 pt-3 flex justify-between'>
                                <p className='text-hijauBtn'>Delivery charge</p>
                                <p className='text-hijauBtn font-bold lg:pb-[8px]'>RP. {parseInt(selectedDelivery.split('-')[1]).toLocaleString('id')},-</p>
                            </div>

                            <div className='py-1 pt-3 flex justify-between'>
                                <p className='text-hijauBtn'>Sub total</p>
                                <p className='text-hijauBtn  lg:pb-[8px]'>Wait for admin confirmation</p>
                            </div>

                        </div>

                        <button className='mx-auto  bg-hijauBtn hover:bg-white text-white hover:text-hijauBtn border w-[290px] lg:w-[312px] h-[42px] lg:h-[40px] font-bold lg:mt-[24px]'>
                            Order
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrescriptionPage;
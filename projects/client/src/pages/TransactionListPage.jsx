import React from "react";
import ButtonComponent from "../components/ButtonComponent";
import {
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Radio,
    RadioGroup,
    Stack,
    Input
} from "@chakra-ui/react";
import SearchBar from "../components/SearchBar";
import { HiChevronDown } from "react-icons/hi";
import { FiShoppingBag } from "react-icons/fi";



export default function TransactionListPage() {

    return (
        <div className="bg-bgWhite">
            <div className="max-w-[1400px] mx-auto border-borderHijau border-x min-h-screen">
                <div className="space-y-2 pt-5 px-5">
                    <h1 className="text-2xl font-semibold">Transaction list</h1>
                </div>
                <div className="grid xl:grid-cols-6 gap-4 mt-10 grid-cols-2 px-5 md:grid-cols-6">
                    <div className="hidden md:inline">
                        <h1 className="font-medium mb-2">Filter</h1>
                        <hr className="border border-borderHijau my-2 opacity-25 mb-5" />
                        <RadioGroup>
                            <Stack>
                                <Radio>Awaiting Payment </Radio>
                                <Radio>Awaiting Payment Confirmation </Radio>
                                <Radio>Processed </Radio>
                                <Radio>Cancelled </Radio>
                                <Radio>Shipped </Radio>
                                <Radio>Order Confirmed </Radio>
                            </Stack>
                        </RadioGroup>

                        <div className="py-3">
                            <div className="pb-3">
                                <label className="py-3">From :</label>
                                <Input
                                    type="date"
                                    min="1922-01-01"
                                    max="2022-09-29"
                                />
                            </div>

                            <label >To :</label>
                            <Input
                                type="date"
                                min="1922-01-01"
                                max="2022-09-29"
                            />
                        </div>

                        <SearchBar />
                        <div className="space-x-5">
                            <ButtonComponent
                                text="Reset"
                                py="2"
                                px="5"
                                brightness="90"
                                class="border border-borderHijau hover:bg-borderHijau hover:text-white font-medium rounded-full my-3"
                            />
                        </div>
                        {/* Left Area : Filter bar  */}
                    </div>
                    <div className="xl:col-span-5 md:col-span-3">
                        <div className="text-right mb-5">
                            <Menu>
                                <MenuButton as={Button} rightIcon={<HiChevronDown />} className='border border-borderHijau hover:bg-borderHijau hover:!text-white !font-medium !text-black hover:brightness-110' size='sm' colorScheme='hijau'
                                    style={{ borderRadius: 0, border: '1px solid #1F6C75' }}>
                                </MenuButton>
                                <MenuList>
                                    <MenuItem className='text-base'>Date (ascending)</MenuItem>
                                    <MenuItem className='text-base'>Date (descending)</MenuItem>
                                    <MenuItem className='text-base'>Invoice (ascending)</MenuItem>
                                    <MenuItem className='text-base'>Invoice (descending)</MenuItem>
                                </MenuList>
                            </Menu>
                        </div>
                        {/* Right Area : Product Carousel with sort */}
                        <div className="border rounded w-3/4 mx-auto p-6 bg-white ">
                            <div className="flex justify-between border-b pb-2">
                                <div className=" flex">
                                    <div className="flex items-center mx-2">
                                        <FiShoppingBag />
                                    </div>

                                    <div className="flex items-center mx-2">
                                        <p>22 September 2022</p>
                                    </div>

                                    <div className="flex items-center mx-2">
                                        <p>INV/2022021290</p>
                                    </div>

                                </div>

                                <div className="rounded font-bold text-[#37ba69] flex items-center bg-[#d6ffde] px-2 mx-2">
                                    Processed
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex">
                                    <div className="flex items-center">
                                        <img className="w-[120px]" src="https://d2qjkwm11akmwu.cloudfront.net/products/2a19fc0a-32dc-406c-9860-b4ff3348b10b_product_image_url.webp" alt="img_prod" />
                                    </div>

                                    <div className="flex items-center row">
                                        <div>
                                            <p>Telsat 40mg x 1</p>
                                            <p className="text-muted text-[12px]">and 1 more product</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="pr-6 pl-3">
                                        <p>Total purchase</p>
                                        <p className="font-bold">Rp200.000,-</p>
                                    </div>

                                </div>
                            </div>

                            <div className="flex justify-end pr-6">
                                <button className="border py-2 px-6 hover:bg-white hover:text-hijauBtn bg-hijauBtn text-white font-bold">See details</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { useContext } from 'react';
import { Tab } from '@headlessui/react';
import { DataContext } from './DataContext';
import './tabs.css'
function MyTabs() {
    const { data, setData } = useContext(DataContext);
    console.log(data);
    return (
        <div className=' tabs-container shadow-lg'>
            <Tab.Group>
                <Tab.List className='pt-30 pb-1/2'>
                    <Tab className='w-1/2'>Trending</Tab>
                    <Tab className='w-1/2 '>Recent</Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        {/* Check that data is not null and that it is an array before calling map */}
                        {Array.isArray(data) ? data.map((list, index) => (
                            list.special_key ? <div key={index}>{list.name}</div> : null
                        )) : null}
                    </Tab.Panel>
                    <Tab.Panel>
                        {Array.isArray(data) ? data.map((list,index) => (
                           !list.special_key ? <div className=
                            'block rounded-lg p-4 mb-3.5 no-scrollbar  mytab  bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700w'
                           key={index}>
                               <img
                                   className="rounded-t-lg"
                                   src={list.image}
                               alt="" />
                               <h5
                                   className=" text-xl  pt-5 font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                   {list.name}
                               </h5>
                            <p className=' text-base pt-5 text-neutral-600 dark:text-neutral-200'>{list.description}</p>
                               <hr className='h-0.5  mt-5 bg-black shadow-md	'></hr>
                               <p className='pt-5'>{list.fact}</p>

                           </div> : null
            )): null}
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}

export default MyTabs;

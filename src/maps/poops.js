import { useContext } from 'react';
import { Tab } from '@headlessui/react';
import { DataContext } from './DataContext';
import './tabs.css'
function MyTabs() {
    const { data, setData } = useContext(DataContext);
    console.log(data);
    // Check if data is an array before rendering
    const renderData = (conditionFunc = () => true) => (
        Array.isArray(data) && data.map((item, index) =>
                conditionFunc(item) && (
                    <div key={item.id || index}>
                        <img className="rounded-t-lg" src={item.image} alt={item.name} />
                        <h5 className="text-xl pt-5 font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                            {item.name}
                        </h5>
                        <p className='text-base pt-5 text-neutral-600 dark:text-neutral-200'>{item.description}</p>
                        <hr className='h-0.5 mt-5 bg-black shadow-md'></hr>
                        <p className='pt-5'>{item.description}</p>
                    </div>
                )
        )
    );
    return (
        <div className=' tabs-container shadow-lg'>
            <Tab.Group>
                <Tab.List className='pt-30 pb-1/2'>
                    <Tab className='w-1/2'>Trending</Tab>
                    <Tab className='w-1/2 '>Recent</Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        {Array.isArray(data) && data.data.map((list, index) => (
                            <div key={index}>{list.name}</div>
                        ))}
                    </Tab.Panel>
                    <Tab.Panel>
                        {Array.isArray(data?.data) && data?.data.map((list, index) => (
                            <div
                                className='block rounded-lg p-4 mb-3.5 no-scrollbar mytab bg-white shadow-[0px 2px 15px -3px rgba(0,0,0,0.07), 0px 10px 20px -2px rgba(0,0,0,0.04)] dark:bg-neutral-700'
                                key={index}
                            >
                                <img className="rounded-t-lg" src={list.photo?.images?.large?.url} alt={list.name} />
                                <h5 className="text-xl pt-5 font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                    {list.name}
                                </h5>
                                <p className='text-base pt-5 text-neutral-600 dark:text-neutral-200'>{list.description}</p>
                                <hr className='h-0.5 mt-5 bg-black shadow-md'></hr>
                            </div>
                        ))}
                    </Tab.Panel>

                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}

export default MyTabs;

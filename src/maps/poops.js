import { Fragment ,useContext } from 'react';
import { Tab } from '@headlessui/react';
import { DataContext } from './DataContext';
import './tabs.css';
import './bigmap.css';

function MyTabs() {
    const { data } = useContext(DataContext);
    console.log(data);

    // Assuming data is an object with a 'data' array for the API callback results
    const apiData = data?.data || [];

    return (
        <div className='tabs-container shadow-lg'>
            <Tab.Group>
                <Tab.List className='flex p-1 space-x-1 bg-blue-900/20 rounded-xl'>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ${
                                    selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                }`}
                            >
                                Attraction Points
                            </button>
                        )}
                    </Tab>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ${
                                    selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                }`}
                            >
                                Other Tab
                            </button>
                        )}
                    </Tab>
                </Tab.List>
                <Tab.Panels className='mt-2'>
                    <Tab.Panel
                        className='rounded-xl bg-white p-3'
                    >
                        {apiData.map((list, index) => (
                            <div
                                className='rounded-lg p-4 mb-3.5 mytab shadow-md'
                                key={list.id || index}
                            >
                                <img className="rounded-t-lg" src={list.photo?.images?.large?.url} alt={list.name} />
                                <h5 className="text-xl font-medium leading-tight text-black">
                                    {list.name}
                                </h5>
                                <p className='text-base'>{list.description}</p>
                                <hr className='my-4' />
                            </div>
                        ))}
                    </Tab.Panel>
                    <Tab.Panel
                        className='rounded-xl bg-white p-3'
                    >
                        {/* Render something else here for the second tab */}
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}

export default MyTabs;

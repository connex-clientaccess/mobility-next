import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function Home() {
  const [lead, setLead] = useState({});
  const [leadEmail, setLeadEmail] = useState("");
  const [found, showResult] = useState(false);
  const [notFoundError, setErrorVisible] = useState(false);
  const [clear, showClear] = useState(false);
  //const [modalIsOpen, setIsOpen] = useState(false);
  let [isOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const clickFunction = () => {
    if (leadEmail !== "") {
      //fetchData();
    }
  };

  const convertLeadToCompany = () => {

  };

  const convertLeadToOpportunity = () => {

  };

  const convertLeadToPerson = () => {

  };

  const clearFunction = () => {
    setLead({});
    setLeadEmail("");
    //document.getElementById("leadEmail").value = "";
    showResult(false);
    setErrorVisible(false);
    showClear(false);
  };

  const handleInput = (event: any) => {
    setLeadEmail(event.target.value);
    setErrorVisible(false);
    //console.log("Input Value: ", event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/api/search", {
        method: "POST"
      });
      console.log("Data", data.json());
    }
    fetchData();
  },[])
  return (
    <div className="App p-4 align-items-center">
    <div className="flex flex-wrap mx-3 mb-6">
      <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="leadEmail"
          type="text"
          placeholder="Lead Email Address"
          onChange={handleInput}
        ></input>
      </div>
      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-1 mr-1"
            onClick={clickFunction}
            id="searchLeadButton"
          >
            Search
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded my-1 mr-1"
            id="showModal"
            onClick={openModal}
          >
            Create Lead
          </button>
        </div>
      </div>
      {clear ? (
        <div className="w-full">
          <button
            className="bg-transparent hover:bg-blue-50 text-blue font-bold py-2 px-4 rounded my-1"
            onClick={clearFunction}
            id="clearLeadButton"
          >
            Clear Result
          </button>
        </div>
      ) : (
        <></>
      )}
      {notFoundError ? (
        <div className="w-full rounded bg-red-50 p-2">
          <div className="text-red-500 font-semibold">
            No Lead found for your search
          </div>
        </div>
      ) : (
        <></>
      )}
        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create New Lead
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          id="grid-first-name"
                          type="text"
                          placeholder="Jane"
                        ></input>
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          type="text"
                          placeholder="Doe"
                        ></input>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email Address
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-password"
                          type="email"
                          placeholder="lead@address.com"
                        ></input>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Street Address
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-password"
                          type="text"
                          placeholder="Enter the Street Address"
                        ></input>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-city"
                        >
                          City
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-city"
                          type="text"
                          placeholder="Albuquerque"
                        ></input>
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-state"
                        >
                          State
                        </label>
                        <div className="relative">
                          <select
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-state"
                          >
                            <option>New Mexico</option>
                            <option>Missouri</option>
                            <option>Texas</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              className="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-zip"
                        >
                          Zip
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-zip"
                          type="text"
                          placeholder="90210"
                        ></input>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
    {found ? (
      <div className="p-4">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-sm text-teal-900 font-bold" id="lead_name">
              {(lead as any).name}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm text-teal-900 font-bold" id="lead_email">
              {}
            </dd>
          </div>

          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Phone</dt>
            <dd className="mt-1 text-sm text-teal-900 font-bold" id="lead_phone">
              {(lead as any).phone_numbers[0].number} ({(lead as any).phone_numbers[0].category}
              )
            </dd>
          </div>

          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Company</dt>
            <dd
              className="mt-1 text-sm text-teal-900 font-bold"
              id="lead_company"
            >
              {(lead as any).company_name === null ? "N/A" : (lead as any).company_name}
            </dd>
          </div>

          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Address</dt>
            <dd className="mt-1 max-w-prose text-sm text-teal-900 font-bold space-y-5">
              <p id="lead_address_1">
                {(lead as any).address.street}
                {(lead as any).address.city}
              </p>
              <p id="lead_address_2">
                {(lead as any).address.state}
                {(lead as any).address.postal_code}
              </p>
            </dd>
          </div>
        </dl>
        <div className="flex flex-wrap mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={convertLeadToPerson}
              id="convertLeadToPersonButton"
            >
              Convert Lead to Person
            </button>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              onClick={convertLeadToCompany}
              id="convertLeadToPersonButton"
            >
              Convert Lead to Company
            </button>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <button
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
              onClick={convertLeadToOpportunity}
              id="convertLeadToPersonButton"
            >
              Convert Lead to Opportunity
            </button>
          </div>
        </div>
      </div>
    ) : (
      <></>
    )}
  </div>
  )
}

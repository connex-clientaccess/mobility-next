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
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
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

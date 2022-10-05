import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function Home() {
  const [lead, setLead] = useState({});
  const [leadEmail, setLeadEmail] = useState("");
  const [contact_type_option, setContactTypeOptionSelected] = useState(0);
  const [owner_option, setOwnerOptionSelected] = useState(0);
  const [customer_source_option, setCustomerSourceOption] = useState(0);
  const [product_interest_option, setProductInterestOption] = useState(0);
  const [found, showResult] = useState(false);
  const [notFoundError, setErrorVisible] = useState(false);
  const [clear, showClear] = useState(false);
  const [owner_choices, setOwnerChoices] = useState([]);
  const [product_interest, setProductInterest] = useState([])
  const [customer_sources, setCustomerSources] = useState([])
  //const [modalIsOpen, setIsOpen] = useState(false);
  let [isOpen, setIsOpen] = useState(false)
  let [isOpenPerson, setIsOpenPerson] = useState(false);
  const [contact_types, setContactTypes] = useState([]);

  useEffect(() => {
    load_contact_types()
    load_owner_choices()
    load_product_interests()
    load_customer_sources()
  },[])

  async function load_contact_types() {
    //fetch contact types
    // API endpoint where we send form data.
    const endpoint = '/api/contact_types'

    // Form the request for sending data to the server.
    const options = {
      // The method is GET because we are retrieving data.
      method: 'GET',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },

    }
    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    console.log(result)
    setContactTypes(result.data);
  }

  async function load_owner_choices() {
    //fetch contact types
    // API endpoint where we send form data.
    const endpoint = '/api/users_search'

    // Form the request for sending data to the server.
    const options = {
      // The method is GET because we are retrieving data.
      method: 'GET',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },

    }
    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    console.log(result)
    setOwnerChoices(result.data);
  }

  async function load_product_interests() {
    //fetch contact types
    // API endpoint where we send form data.
    const endpoint = '/api/custom_fields'

    // Form the request for sending data to the server.
    const options = {
      // The method is GET because we are retrieving data.
      method: 'GET',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },

    }
    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    console.log(result)
    setProductInterest(result.data);
  }

  async function load_customer_sources() {
    //fetch contact types
    // API endpoint where we send form data.
    const endpoint = '/api/customer_sources'

    // Form the request for sending data to the server.
    const options = {
      // The method is GET because we are retrieving data.
      method: 'GET',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },

    }
    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    console.log(result)
    setCustomerSources(result.data);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openConvertPersonModal() {
    setIsOpenPerson(true);
  }

  function closeConvertPersonModal() {
    setIsOpenPerson(false);
  }

  const handleContactTypeChange = (event: any) => {
    console.log("Selected Option Contact Type: ", event.target.value)
    setContactTypeOptionSelected(event.target.value)
  }

  const handleOwnerChange = (event: any) => {
    console.log("Selected Option Owner: ", event.target.value)
    setOwnerOptionSelected(event.target.value)
  }

  const handleCustomerSourceChange = (event: any) => {
    console.log("Selected Option Customer Source: ", event.target.value)
    setCustomerSourceOption(event.target.value)
  }

  const handleProductInterestChange = (event: any) => {
    console.log("Selected Option Product Interest: ", event.target.value)
    setProductInterestOption(event.target.value)
  }

  const handleSubmit = async (event: any) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Get data from the form.
    const data = {
      first: event.target.first.value,
      last: event.target.last.value,
      email: event.target.email.value,
      street_address: event.target.street_address.value,
      state: event.target.state.value,
      city: event.target.city.value,
      zip: event.target.zip.value,
      description: event.target.description.value,
      owner: owner_option,
      customer_source: customer_source_option,
      product_interest: product_interest_option,
      value: event.target.lead_value.value
    }
    console.log("Body", JSON.stringify(data))

    // API endpoint where we send form data.
    const endpoint = '/api/lead'

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSON.stringify(data),
    }
    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    alert(`Lead Created Succesfully: ${result.data}`)

  }

  const handleSubmitConvertLeadToPerson = async (event: any) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Get data from the form.
    const data = {
      contact_type: contact_type_option,
      contact_id: (lead as any).id,
      assigned_id: (lead as any).assigned_id,
      name: (lead as any).name
    }
    console.log("Body", JSON.stringify(data))

    // API endpoint where we send form data.
    const endpoint = '/api/convert'

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSON.stringify(data),
    }
    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    alert(`Lead Converted to Person Succesfully: ${JSON.stringify(result.data)}`)

  }

  const clickFunction = async () => {
    if (leadEmail !== "") {
      const bodyPayload = { email: leadEmail };
      const data = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify(bodyPayload)
      });
      const result = await data.json()
      console.log("Data from api:", result)
      const leadReturned = result.data[0];
      //console.log('LEad: ', leadReturned)
      if(result.data.length === 0){
        //show message prompt
        //console.log("nothing returned");
        setErrorVisible(true);
        showResult(false);
      }else{
        //show result
        setLead(leadReturned);
        showResult(true);
        showClear(true);
      }
    }
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
      {/* Create Lead Modal */}
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
                  <form onSubmit={handleSubmit}>
                  <div className="mt-2">
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          id="first"
                          type="text"
                          placeholder="Jane"
                        ></input>
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="last"
                          type="text"
                          placeholder="Doe"
                        ></input>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="email"
                        >
                          Email Address
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="email"
                          type="email"
                          placeholder="lead@address.com"
                        ></input>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="street_address"
                        >
                          Street Address
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="street_address"
                          type="text"
                          placeholder="Enter the Street Address"
                        ></input>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="city"
                        >
                          City
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="city"
                          type="text"
                          placeholder="Albuquerque"
                        ></input>
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="state"
                        >
                          State
                        </label>
                        <div className="relative">
                          <select
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="state"
                          >
                            <option value="Alabama">Alabama</option><option value="Alaska">Alaska</option><option value="Arizona">Arizona</option><option value="Arkansas">Arkansas</option><option value="California">California</option><option value="Colorado">Colorado</option><option value="Connecticut">Connecticut</option><option value="Delaware">Delaware</option><option value="District of Columbia">District of Columbia</option><option value="Florida">Florida</option><option value="Georgia">Georgia</option><option value="Guam">Guam</option><option value="Hawaii">Hawaii</option><option value="Idaho">Idaho</option><option value="Illinois">Illinois</option><option value="Indiana">Indiana</option><option value="Iowa">Iowa</option><option value="Kansas">Kansas</option><option value="Kentucky">Kentucky</option><option value="Louisiana">Louisiana</option><option value="Maine">Maine</option><option value="Maryland">Maryland</option><option value="Massachusetts">Massachusetts</option><option value="Michigan">Michigan</option><option value="Minnesota">Minnesota</option><option value="Mississippi">Mississippi</option><option value="Missouri">Missouri</option><option value="Montana">Montana</option><option value="Nebraska">Nebraska</option><option value="Nevada">Nevada</option><option value="New Hampshire">New Hampshire</option><option value="New Jersey">New Jersey</option><option value="New Mexico">New Mexico</option><option value="New York">New York</option><option value="North Carolina">North Carolina</option><option value="North Dakota">North Dakota</option><option value="Northern Marianas Islands">Northern Marianas Islands</option><option value="Ohio">Ohio</option><option value="Oklahoma">Oklahoma</option><option value="Oregon">Oregon</option><option value="Pennsylvania">Pennsylvania</option><option value="Puerto Rico">Puerto Rico</option><option value="Rhode Island">Rhode Island</option><option value="South Carolina">South Carolina</option><option value="South Dakota">South Dakota</option><option value="Tennessee">Tennessee</option><option value="Texas">Texas</option><option value="Utah">Utah</option><option value="Vermont">Vermont</option><option value="Virginia">Virginia</option><option value="Virgin Islands">Virgin Islands</option><option value="Washington">Washington</option><option value="West Virginia">West Virginia</option><option value="Wisconsin">Wisconsin</option><option value="Wyoming">Wyoming</option>
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
                          htmlFor="zip"
                        >
                          Zip
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="zip"
                          type="text"
                          placeholder="90210"
                        ></input>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="owner"
                        >
                          Owner
                        </label>
                        {owner_choices.length !== 0 ? 
                        <>
                        <select id='owner' className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        onChange={handleOwnerChange}
                        >
                          {owner_choices.map(({id, name}: any) => {
                            return <option key={id} value={id}>{name}</option>
                          })}
                        </select>
                        </> 
                        : <></>}
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="product_interest"
                        >
                          Product Interest
                        </label>
                        {product_interest.length !== 0 ? 
                        <>
                        <select id='product_interest' className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        onChange={handleProductInterestChange}
                        >
                          {product_interest.map(({id, name}: any) => {
                            return <option key={id} value={id}>{name}</option>
                          })}
                        </select>
                        </> 
                        : <></>}
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="customer_sources"
                        >
                          Customer Sources
                        </label>
                        {customer_sources.length !== 0 ? 
                        <>
                        <select id='customer_sources' className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        onChange={handleCustomerSourceChange}
                        >
                          {customer_sources.map(({id, name}: any) => {
                            return <option key={id} value={id}>{name}</option>
                          })}
                        </select>
                        </> 
                        : <></>}
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="description"
                        >
                          Description
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="description"
                          type="text"
                          placeholder="Lead Description"
                        ></input>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="lead_value"
                        >
                          Lead Value
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="lead_value"
                          type="number"
                          placeholder="20000"
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Save
                    </button>
                  </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* End of Create Lead Modal */}

      {/* Convert to Person Modal */}
      <Transition appear show={isOpenPerson} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeConvertPersonModal}>
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
                    Convert Lead
                  </Dialog.Title>
                  <form onSubmit={handleSubmitConvertLeadToPerson}>
                  <div className="mt-2">
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="email"
                        >
                          Set Contact Type
                        </label>
                        {contact_types.length !== 0 ? 
                        <>
                        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        onChange={handleContactTypeChange}>
                          {contact_types.map(({id, name}: any) => {
                            return <option key={id} value={id}>{name}</option>
                          })}
                        </select>
                        </> 
                        : <></>}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeConvertPersonModal}
                    >
                      Convert {(lead as any).name} to a Person
                    </button>
                  </div>
                  </form>
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
              {(lead as any).phone_numbers.length !== 0 ? (lead as any).phone_numbers[0].number : <></>}
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
              onClick={openConvertPersonModal}
              id="convertLeadToPersonButton"
            >
              Convert Lead to Person
            </button>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 hidden">
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              //onClick={convertLeadToCompany}
              id="convertLeadToPersonButton"
            >
              Convert Lead to Company
            </button>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 hidden">
            <button
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
              //onClick={convertLeadToOpportunity}
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

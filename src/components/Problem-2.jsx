import React, { useState, useEffect } from "react";

const Problem2 = () => {
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [searchTextA, setSearchTextA] = useState("");
  const [searchTextB, setSearchTextB] = useState("");
  const [pageA, setPageA] = useState(1);
  const [pageB, setPageB] = useState(1);
  const [contactsA, setContactsA] = useState([]);
  const [contactsB, setContactsB] = useState([]);

  const handleOpenModalA = () => {
    setShowModalA(true);
    setPageA(1);
    loadContactsA(1);
  };

  const handleOpenModalB = () => {
    setShowModalB(true);
    setPageB(1);
    loadContactsB(1);
  };

  const handleCloseModals = () => {
    setShowModalA(false);
    setShowModalB(false);
    setShowModalC(false);
  };

  const handleOpenModalC = (content) => {
    setModalContent(content);
    setShowModalC(true);
  };

  const loadContactsA = (page) => {
    //API URL for all contacts
    const apiUrl = `https://contact.mediusware.com/api/contacts/?search=${searchTextA}&page=${page}&page_size=10`;

    // Make an API request to fetch contacts
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setContactsA((prevContacts) => [...prevContacts, ...data.results]);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  };

  const loadContactsB = (page) => {
    //API URL for US contacts
    const apiUrl = `https://contact.mediusware.com/api/country-contacts/US/?search=${searchTextB}&page=${page}&page_size=10`;

    // Make an API request to fetch US contacts
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setContactsB((prevContacts) => [...prevContacts, ...data.results]);
      })
      .catch((error) => {
        console.error("Error fetching US contacts:", error);
      });
  };

  const handleScrollA = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      // Load the next page when scrolling to the bottom
      const nextPage = pageA + 1;
      setPageA(nextPage);
      loadContactsA(nextPage);
    }
  };

  const handleScrollB = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      // Load the next page when scrolling to the bottom
      const nextPage = pageB + 1;
      setPageB(nextPage);
      loadContactsB(nextPage);
    }
  };

  useEffect(() => {
    if (showModalA) {
      setContactsA([]);
      loadContactsA(1);
    }
  }, [showModalA, searchTextA]);

  useEffect(() => {
    if (showModalB) {
      setContactsB([]);
      loadContactsB(1);
    }
  }, [showModalB, searchTextB]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={handleOpenModalA}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={handleOpenModalB}
          >
            US Contacts
          </button>
        </div>

        {/* Modals */}
        {showModalA && (
          <div
            className="modal"
            tabIndex="-1"
            role="dialog"
            style={{ display: "block" }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modal A</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={handleCloseModals}
                  ></button>
                </div>
                <div className="modal-body" onScroll={handleScrollA}>
                  {/* Contacts List A */}
                  <ul className="list-group">
                    {contactsA.map((contact) => (
                      <li
                        key={contact.id}
                        className="list-group-item"
                        onClick={() => handleOpenModalC(contact)}
                      >
                        Phone: {contact.phone}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="modal-footer">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTextA}
                    onChange={(e) => setSearchTextA(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ backgroundColor: "#461391" }}
                    onClick={handleOpenModalA}
                  >
                    Modal Button A
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ backgroundColor: "#ff7f50" }}
                    onClick={handleOpenModalB}
                  >
                    Modal Button B
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ backgroundColor: "#46139f" }}
                    onClick={handleCloseModals}
                  >
                    Modal Button C
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showModalB && (
          <div
            className="modal"
            tabIndex="-1"
            role="dialog"
            style={{ display: "block" }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modal B</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={handleCloseModals}
                  ></button>
                </div>
                <div className="modal-body" onScroll={handleScrollB}>
                  {/* Contacts List B */}
                  <ul className="list-group">
                    {contactsB.map((contact) => (
                      <li
                        key={contact.id}
                        className="list-group-item"
                        onClick={() => handleOpenModalC(contact)}
                      >
                        Phone: {contact.phone}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="modal-footer">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTextB}
                    onChange={(e) => setSearchTextB(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ backgroundColor: "#461391" }}
                    onClick={handleOpenModalA}
                  >
                    Modal Button A
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ backgroundColor: "#ff7f50" }}
                    onClick={handleOpenModalB}
                  >
                    Modal Button B
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ backgroundColor: "#46139f" }}
                    onClick={handleCloseModals}
                  >
                    Modal Button C
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showModalC && (
          <div
            className="modal"
            tabIndex="-1"
            role="dialog"
            style={{ display: "block" }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modal C</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShowModalC(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  {/* Contact Details */}
                  <div>ID: {modalContent.id}</div>
                  <div>Phone: {modalContent.phone}</div>
                  <div>Country: {modalContent.country.name}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Problem2;

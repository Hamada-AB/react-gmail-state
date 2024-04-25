import Header from "./components/Header";
import initialEmails from "./data/emails";
import { useState } from "react";

import "./styles/App.css";

function App() {
  // Use initialEmails for state
  const [emailsList, setEmailsList] = useState(initialEmails);
  const [inbox, setInbox] = useState(getUnreadMails(emailsList));
  const [starred, setStarred] = useState(getStarredMails(emailsList));

  function getUnreadMails(array) {
    return array.filter((email) => !email.read);
  }

  function getStarredMails(array) {
    return array.filter((email) => email.starred);
  }

  function handleSelectClick(event) {
    const { id } = event.target;

    const selectedMails = emailsList.map((email) => {
      if (email.id == id) {
        !email.read ? (email.read = true) : (email.read = false);
      }
      return email;
    });

    setEmailsList(selectedMails);
    setInbox(getUnreadMails(selectedMails));
  }

  function handleStarredClick(event) {
    const { id } = event.target;

    const starredMails = emailsList.map((email) => {
      if (email.id == id) {
        !email.starred ? (email.starred = true) : (email.starred = false);
      }
      return email;
    });

    setStarred(getStarredMails(starredMails));
  }

  function handleHideReadChange(event) {
    const { checked } = event.target;

    if (checked) {
      setEmailsList(inbox);
    } else {
      setEmailsList(initialEmails);
    }
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            onClick={() => setEmailsList(initialEmails)}
          >
            <span className="label">Inbox</span>
            <span className="count">{inbox.length}</span>
          </li>

          <li className="item" onClick={() => setEmailsList(starred)}>
            <span className="label">Starred</span>
            <span className="count">{starred.length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              disabled={inbox.length === 0 ? true : false}
              onChange={handleHideReadChange}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {/* Render a list of emails here */}
        {emailsList.map((email) => {
          let liClasses;
          if (!email.read) {
            liClasses = "email unread";
          } else {
            liClasses = "email read";
          }

          return (
            <li className={liClasses} key={email.id}>
              <div className="select">
                <input
                  className="select-checkbox"
                  type="checkbox"
                  id={email.id}
                  checked={email.read}
                  onChange={handleSelectClick}
                />
              </div>

              <div className="star">
                <input
                  className="star-checkbox"
                  type="checkbox"
                  id={email.id}
                  checked={email.starred}
                  onChange={handleStarredClick}
                />
              </div>

              <div className="sender">{email.sender}</div>

              <div className="title">{email.title}</div>
            </li>
          );
        })}
      </main>
    </div>
  );
}

export default App;

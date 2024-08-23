import React from 'react';
import styles from '../style/Form.module.css';

const VoyageCreate = () => {
  return (
    <div>
      <h2 className={styles.pageTitle}>Add New Voyage</h2>
      <form className={styles.form}>
        <div>
          <label>
            Vessel Name:
            <input type="text" required />
          </label>
        </div>
        <div>
          <label>
            Vessel Type:
            <select required>
              <option value="">Select Vessel Type</option>
              {/* Dynamic options will be populated here */}
            </select>
          </label>
        </div>
        <div>
          <label>
            Rank:
            <select required>
              <option value="">Select Rank</option>
              {/* Dynamic options will be populated here */}
            </select>
          </label>
        </div>
        <div>
          <label>
            IMO Number:
            <input type="text" required />
          </label>
        </div>
        <div>
          <label>
            Joining Port:
            <input type="text" required />
          </label>
        </div>
        <div>
          <label>
            Joining Date:
            <input type="date" required />
          </label>
        </div>
        <div>
          <label>
            Leaving Port:
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            Leaving Date:
            <input type="date" />
          </label>
        </div>
        <div>
          <label>
            Remarks:
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            Flag:
            <input type="text" required />
          </label>
        </div>
        <button type="submit" className={styles.button}>Create Voyage</button>
      </form>
    </div>
  );
};

export default VoyageCreate;

import React from 'react';
import styles from '../style/Form.module.css';

const VoyageUpdate = () => {
  const voyageData = {
    vesselName: '',
    vesselType: '',
    rank: '',
    imoNumber: '',
    joiningPort: '',
    joiningDate: '',
    leavingPort: '',
    leavingDate: '',
    remarks: '',
    flag: '',
  };

  return (
    <div>
      <h2 className={styles.pageTitle}>Edit Voyage</h2>
      <form>
        <div>
          <label>
            Vessel Name:
            <input type="text" name="vesselName" value={voyageData.vesselName} required />
          </label>
        </div>
        <div>
          <label>
            Vessel Type:
            <select name="vesselType" value={voyageData.vesselType} required>
              <option value="">Select Vessel Type</option>
              {/* Dynamic options will be populated here */}
            </select>
          </label>
        </div>
        <div>
          <label>
            Rank:
            <select name="rank" value={voyageData.rank} required>
              <option value="">Select Rank</option>
              {/* Dynamic options will be populated here */}
            </select>
          </label>
        </div>
        <div>
          <label>
            IMO Number:
            <input type="text" name="imoNumber" value={voyageData.imoNumber} required />
          </label>
        </div>
        <div>
          <label>
            Joining Port:
            <input type="text" name="joiningPort" value={voyageData.joiningPort} required />
          </label>
        </div>
        <div>
          <label>
            Joining Date:
            <input type="date" name="joiningDate" value={voyageData.joiningDate} required />
          </label>
        </div>
        <div>
          <label>
            Leaving Port:
            <input type="text" name="leavingPort" value={voyageData.leavingPort} />
          </label>
        </div>
        <div>
          <label>
            Leaving Date:
            <input type="date" name="leavingDate" value={voyageData.leavingDate} />
          </label>
        </div>
        <div>
          <label>
            Remarks:
            <input type="text" name="remarks" value={voyageData.remarks} />
          </label>
        </div>
        <div>
          <label>
            Flag:
            <input type="text" name="flag" value={voyageData.flag} required />
          </label>
        </div>
        <div className={styles.buttons}>
        <button type="button"><i class="fa-solid fa-file-pen"></i>    Update Voyage</button>
        <button type="button" className={styles.btnDelete}><i class="fa-solid fa-trash"></i>   Delete Voyage</button>
        </div>
        
      </form>
    </div>
  );
};

export default VoyageUpdate;

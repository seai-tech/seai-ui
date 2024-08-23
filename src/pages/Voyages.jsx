import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../style/Voyages.module.css';
import classnames from 'classnames';

const Voyages = () => {
    const [userId, setUserId] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [filteredRows, setFilteredRows] = useState([]); // Filtered rows state

    const voyages = []; //the data will be dynamically injected

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        setUserId(storedUserId);
    }, []);

    // Filter voyages based on search input
    //search bar-a raboti, ama nqma zapisi v tablicata i bugva
    /*useEffect(() => {
        const filter = searchInput.toUpperCase();
        const filtered = voyages.filter((row) => {
            const vesselName = row.vesselName.toUpperCase();
            return vesselName.includes(filter);
        });
        setFilteredRows(filtered);
    }, [searchInput, voyages]);

    const handleSearchChange = (event) => {
        setSearchInput(event.target.value);
    };*/

    return (
        <>
            <main className="table">
                <div className={styles.buttonContainer}>
                    <button className={classnames(styles.button, styles.btn1)}><i class="fa-solid fa-camera"></i>    Scan</button>
                    <Link to="/voyages/create" className={styles.button}><i class="fa-solid fa-plus"></i>   Create Voyage</Link>
                </div>

                <section className={styles.tableHeader}>
                    {userId ? (
                        <h1>Welcome, {userId} - Your Voyages</h1>
                    ) : (
                        <h1>Your Voyages</h1>
                    )}
                    <div className={styles.box}>
                        <input
                            type="text"
                            id="searchInput"
                            placeholder="Search by Vessel Name"
                            /*value={searchInput}
                            onChange={handleSearchChange}*/
                        />
                        <a href="#"><i className="fas fa-search"></i></a>
                    </div>
                </section>

                <section className={styles.tableBody}>
                    <table id="voyageTable">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Vessel name</th>
                                <th>Vessel type</th>
                                <th>Vessel flag</th>
                                <th>IMO number</th>
                                <th>Rank</th>
                                <th>Joining port</th>
                                <th>Joining date</th>
                                <th>Leaving port</th>
                                <th>Leaving date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {voyages.map((voyage) => (
                            <tr key={voyage.id}>
                                <td>{voyage.vesselName}</td>
                                <td>{voyage.vesselType}</td>
                                <td>{voyage.rank}</td>
                                <td>{voyage.imoNumber}</td>
                                <td>{voyage.joiningPort}</td>
                                <td>{voyage.joiningDate}</td>
                                <td>{voyage.leavingPort}</td>
                                <td>{voyage.leavingDate}</td>
                                <td>{voyage.remarks}</td>
                                <td>{voyage.flag}</td>
                                <td><button>Edit</button></td>             
                            </tr>
                         ))}

                            {
                            /*filter*/ 
                            /*filteredRows.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.id}</td>
                                    <td>{row.vesselName}</td>
                                    <td>{row.vesselType}</td>
                                    <td>{row.vesselFlag}</td>
                                    <td>{row.imoNumber}</td>
                                    <td>
                                        <p className={`rank ${row.rank.split(' ')[0].toLowerCase()}`}>
                                            {row.rank}
                                        </p>
                                    </td>
                                    <td>{row.joiningPort}</td>
                                    <td>{row.joiningDate}</td>
                                    <td>{row.leavingPort}</td>
                                    <td>{row.leavingDate}</td>
                                </tr>
                            ))*/}
                        </tbody>
                    </table>
                </section>
            </main>
        </>
    );
}

export default Voyages;
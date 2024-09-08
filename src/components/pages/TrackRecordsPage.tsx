import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Pages, resolvePage } from './Pages';
import Deferred from '../global/Deferred';
import api from '../../api';
import { useApi } from '../../hooks';
import { formatDate, formatTime } from '../../utils/Formatters';
import { MetadataContext } from '../../utils/Metadata';

const TrackRecordsPage = () => {
  const metadata = useContext(MetadataContext);

  const { isLoading, data: scores } = useApi(() => api.timetrialsRecordsList({ category: 'nonsc' }));

  return (
    <>
      <h1>World Records</h1>
      <div className="module">
        <Deferred isWaiting={isLoading || metadata.isLoading}>
          <table>
            <thead>
              <tr>
                <th>Track</th>
                <th>Player</th>
                <th>Course</th>
                <th>Lap</th>
                <th>Date</th>
                <th className="col-icon" />
                <th className="col-icon" />
              </tr>
            </thead>
            <tbody>
              {metadata.tracks?.map((track) => [false, true].map((isLap) => {
                const score = scores?.find(
                  (score) => score.track === track.id && score.isLap === isLap
                );
                return (
                  <tr key={`${isLap ? 'l' : 'c'}${track.id}`}>
                    {!isLap && (
                      <td rowSpan={2}>
                        <Link to={resolvePage(Pages.TrackChart, { id: track.id })}>
                          {track.name}
                        </Link>
                      </td>
                    )}
                    <td>
                      {score ? (
                        <Link to={resolvePage(Pages.PlayerProfile, { id: score?.player.id })}>
                          {score?.player.name}
                        </Link>
                      ) : "-"}
                    </td>
                    {isLap && <td />}
                    <td>{score ? formatTime(score.value) : "-"}</td>
                    {!isLap && <td />}
                    <td>{score?.date ? formatDate(score.date) : "-"}</td>
                    <td>{score?.videoLink && (
                      <a href={score.videoLink} target="_blank" rel="noopener noreferrer">V</a>
                    )}</td>
                    <td>{score?.ghostLink && (
                      <a href={score.ghostLink} target="_blank" rel="noopener noreferrer">G</a>
                    )}</td>
                  </tr>
                );
              }))}
            </tbody>
          </table>
        </Deferred>
      </div>
    </>
  );
};

export default TrackRecordsPage;

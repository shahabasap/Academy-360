import React, { useState, useEffect } from 'react';
import ProfileSidebar from './profileSidebar';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import ApiController from '../../../Api/apiCalls';
import ConfirmationModal from '../../common/ConfirmationModal2';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectTeacherClass } from '../../../features/teacher/teacherSlice';
import Typography from '@mui/joy/Typography';

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#8890d1',
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const AttendanceList = () => {
  const classroom = useSelector(selectTeacherClass);
  const [selectedDate, setSelectedDate] = useState(getYesterdayDate()); // Default to yesterday
  const [attendanceList, setAttendanceList] = useState([]); // Attendance list state
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [updatingId, setUpdatingId] = useState(''); // For handling confirmation

  // Utility to get yesterday's date in 'YYYY-MM-DD' format
  function getYesterdayDate() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
  }

  // Fetch attendance data when date changes
  const fetchAttendanceData = async (date: string) => {
    setLoading(true);
    setError(''); // Reset error
    try {
      const classroomId = classroom._id;
      const response = await ApiController.getAttendanceByDate(classroomId, date);
      if (response.data && response.data.AttedenceDataSet) {
        setAttendanceList(response.data.AttedenceDataSet);
      } else {
        setAttendanceList([]); // No data found
      }
    } catch (err) {
      console.error('Error fetching attendance:', err);
      setError('Failed to fetch attendance data.');
    } finally {
      setLoading(false);
    }
  };

  // Handle date change and fetch data
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);
    if (date) {
      fetchAttendanceData(date);
    }
  };

  // Handle Confirmation Modal actions
  const cancelAttendance = () => setIsModalOpen(false);
  const confirmAttendance = (studentId: string) => {
    toast.success('Attendance updated successfully!');
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Automatically fetch data for yesterday's date on component mount
    fetchAttendanceData(selectedDate);
  }, [selectedDate]);

  return (
    <div className="flex flex-row min-h-screen bg-gray-50">
      <div className="w-64">
        <ProfileSidebar />
      </div>

      <div className="flex flex-col w-full p-5">
        <div>
          <Typography level="h3">
            {classroom?.subject} Classroom Attendance Sheet
          </Typography>
        </div>

        <div className="mt-4">
          {/* Date Input */}
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="mb-5 p-2 border border-gray-300 rounded-md"
            max={getYesterdayDate()} // Restrict future dates
          />
        </div>

        {/* Loading State */}
        {loading && (
          <Container sx={{ paddingTop: '20px', textAlign: 'center' }}>
            <CircularProgress />
          </Container>
        )}

        {/* Error State */}
        {error && (
          <Container sx={{ paddingTop: '20px' }}>
            <Alert severity="error">{error}</Alert>
          </Container>
        )}

        {/* No Data Message */}
        {!loading && !error && attendanceList.length === 0 && (
          <Container sx={{ paddingTop: '20px' }}>
            <Alert severity="info">No attendance data found for the selected date.</Alert>
          </Container>
        )}

        {/* Attendance Table */}
        {!loading && !error && attendanceList.length > 0 && (
          <Container sx={{ paddingTop: '20px' }}>
            <TableContainer component={Paper} sx={{ borderRadius: '8px', overflow: 'hidden' }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="center">Username</StyledTableCell>
                    <StyledTableCell align="center">Status</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendanceList.map((ele: any) => (
                    <StyledTableRow key={ele._id}>
                      <StyledTableCell component="th" scope="row">
                        {ele.studentId ? ele.studentId.name : 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {ele.studentId ? ele.studentId.username : 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="center">{ele.status}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        )}

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={cancelAttendance}
          onConfirm={() => confirmAttendance(updatingId)}
        />
      </div>
    </div>
  );
};

export default AttendanceList;

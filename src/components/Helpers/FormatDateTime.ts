import { Timestamp } from "firebase/firestore";

const formatDateTime = (data: Timestamp) => {
  const timeNow = Timestamp.now();
  const timeNowFormat = new Date(
    timeNow.seconds * 1000 + timeNow.nanoseconds / 1000000
  );
  const nowDate = timeNowFormat.toDateString();
  const nowNewDate = nowDate.split(" ").reverse().splice(1, 2).join(" ");

  const timeDataFormat = new Date(
    data.seconds * 1000 + data.nanoseconds / 1000000
  );
  const date = timeDataFormat.toDateString();
  const atTime = timeDataFormat.toLocaleTimeString().slice(0, 5);
  const newDate = date.split(" ").reverse().splice(1, 2).join(" ");
  const year = date.slice(-4);

  const timeDifference = timeNow.seconds - data.seconds;
  const dataDay = Number(newDate.slice(0, 2));
  const nowDay = Number(nowNewDate.slice(0, 2));

  if (timeDifference >= 0 && timeDifference < 300) {
    return "Just now";
  }

  if (timeDifference > 300 && timeDifference < 900) {
    return "5 min ago";
  }

  if (timeDifference > 900 && timeDifference < 1800) {
    return "15 min ago";
  }

  if (timeDifference > 1800 && timeDifference < 3600) {
    return "30 min ago";
  }

  if (timeDifference > 3600 && timeDifference < 7200) {
    return "1 hrs ago";
  }

  if (timeDifference > 7200 && timeDifference < 10800) {
    return "2 hrs ago";
  }

  if (timeDifference > 10800 && timeDifference < 14400) {
    return "3 hrs ago";
  }

  if (timeDifference > 14400 && dataDay === nowDay) {
    return "Today at " + atTime;
  }

  if (timeDifference > 14400 && nowDay - dataDay === 1) {
    return "Yesterday at " + atTime;
  }

  if (timeDifference > 14400 && nowDay - dataDay > 1) {
    return newDate + " " + year;
  }
};

export default formatDateTime;

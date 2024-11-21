import database from '@react-native-firebase/database';
const postDataWithRef = (collection, docRef, data) => {
  const value = database()
    .ref(`/${collection}/${docRef}`)
    .set({
      ...data,
    });
  return value;
};
const checkIsUserExist = async phone => {
  let result = await database()
    .ref('/employ/')
    .orderByChild('jobId')
    .equalTo(`${phone}`)
    .once('value')
    .then(snapshot => {
      if (snapshot.exists()) {
        const userId = Object.keys(snapshot.val())[0];
        const data = Object.values(snapshot.val())[0];
        return {userId, ...data};
      } else {
        return null;
      }
    });
  return result;
};
const getUserById = async id => {
  return await database()
    .ref(`/user/${id}`)
    .once('value')
    .then(onSnapshot => {
      return onSnapshot.val();
    });
};
const postData = (collection, data) => {
  const newReference = database().ref(`${collection}`).push();
  const value = newReference.set({
    ...data,
  });
  return value;
};
const getDataWithRef = async (collection, docRef) => {
  return await database()
    .ref(`/${collection}/${docRef}`)
    .once('value')
    .then(onSnapshot => {
      return onSnapshot.val();
    });
};
const postUserDataWithId = async (id, data) => {
  const value = database()
    .ref(`/user/${id}`)
    .update({...data});
  return value;
};

const getEmployDataWithJobId = async jobId => {
  try {
    const ref = database().ref('/employ');
    const snapshot = await ref
      .orderByChild('jobId')
      .equalTo(jobId)
      .once('value');
    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    } else {
      console.log('No data available for the provided jobId');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
const postEmployDataWithJobId = async (jobId, data) => {
  const ref = database().ref('/employ');
  const snapshot = await ref.orderByChild('jobId').equalTo(jobId).once('value');
  if (snapshot.exists()) {
    const userKey = Object.keys(snapshot.val())[0];
    console.log(userKey);
    const value = await database()
      .ref(`/employ/${userKey}`)
      .update({...data});
    return value;
  }
};

const UpdateOrderWithId = async (id, data) => {
  return await database()
    .ref(`/orders/${id}`)
    .update({...data, updatedAt: Date.now()});
};
const updateOrderStatus = async (id, status, TeamId) => {
  return await database()
    .ref(`/orders/${id}`)
    .update({orderStatus: status, TeamId: TeamId, updatedAt: Date.now()});
};
const updateOrderData = async (id, status, TeamId, orderHandlers) => {
  return await database().ref(`/orders/${id}`).update({
    orderStatus: status,
    TeamId: TeamId,
    orderHandlers: orderHandlers,
    updatedAt: Date.now(),
  });
};
const updateOrderProductPrice = async (
  id,
  product,
  price,
  tax,
  total,
  balanceAmount,
) => {
  return await database().ref(`/orders/${id}`).update({
    products: product,
    orderPrice: price,
    taxPrice: tax,
    totalPrice: total,
    updatedAt: Date.now(),
    balanceAmount: balanceAmount,
  });
};

const updateCurrentLocation = async (id, latilude, longitude) => {
  return await database().ref(`/currentLocation/${id}`).update({
    latilude: latilude,
    longitude: longitude,
    updatedAt: new Date().toISOString(),
  });
};
const cancelOrderFun = async (id, status, TeamId, resonTxt) => {
  return await database().ref(`/orders/${id}`).update({
    orderStatus: status,
    TeamId: TeamId,
    cancelReasonTxt: resonTxt,
    updatedAt: Date.now(),
  });
};
const getDataWholeCollection = async collection => {
  const value = await database()
    .ref(`/${collection}`)
    .once('value', onSnapshot => {
      return onSnapshot.val();
    });
  let returnArr = [];

  value.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.id = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};
const getCashBackData = async () => {
  const value = await database()
    .ref('/cashBack')
    .once('value', onSnapshot => {
      return onSnapshot.val();
    });
  return value;
};
const removeData = async (collection, docRef) => {
  return await database().ref(`/${collection}/${docRef}`).remove();
};
const getMYOrders = async userid => {
  let result = await database()
    .ref('orders')
    .orderByChild('OrderedByUserId')
    .equalTo(`${userid}`)
    .once('value')
    .then(onSnapshot => {
      return onSnapshot.val();
    });
  let returnArr = [];
  Object.entries(result).forEach(dat => {
    returnArr.push({id: dat[0], ...dat[1]});
  });
  return returnArr;
};
const getSupervisor = async role => {
  let result = await database()
    .ref('/employ/')
    .orderByChild('role')
    .equalTo(role)
    .once('value')
    .then(snapshot => {
      if (snapshot.exists()) {
        const userId = Object.keys(snapshot.val())[0];
        const data = Object.values(snapshot.val())[0];
        return {userId, ...data};
      } else {
        return null;
      }
    });
  return result;
};
const getAllOrders = async () => {
  let result = await database()
    .ref('orders')
    .once('value')
    .then(onSnapshot => {
      return onSnapshot.val();
    });
  let returnArr = [];
  Object.entries(result).forEach(dat => {
    returnArr.push({id: dat[0], ...dat[1]});
  });
  returnArr?.sort((a, b) => b?.createdAt - a?.createdAt);
  return returnArr;
};
const getMYServicesReq = async userid => {
  let result = await database()
    .ref('supportOrders')
    .orderByChild('OrderedByUserId')
    .equalTo(`${userid}`)
    .once('value')
    .then(onSnapshot => {
      return onSnapshot.val();
    });
  let returnArr = [];
  Object.entries(result).forEach(dat => {
    returnArr.push({id: dat[0], ...dat[1]});
  });
  return returnArr;
};

const getEmployDataWithJobrole = async role => {
  try {
    const ref = database().ref('/employ');
    const snapshot = await ref.orderByChild('role').equalTo(role).once('value');
    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    } else {
      console.log('No data available for the provided jobId');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export {
  postDataWithRef,
  getDataWithRef,
  getDataWholeCollection,
  postData,
  postEmployDataWithJobId,
  getEmployDataWithJobId,
  removeData,
  checkIsUserExist,
  postUserDataWithId,
  getMYOrders,
  UpdateOrderWithId,
  getMYServicesReq,
  getAllOrders,
  updateOrderStatus,
  getUserById,
  getSupervisor,
  database,
  cancelOrderFun,
  getCashBackData,
  updateOrderProductPrice,
  updateOrderData,
  updateCurrentLocation,
  getEmployDataWithJobrole,
};

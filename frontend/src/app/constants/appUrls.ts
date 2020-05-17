export const APPURLS  = {
    APIURL: 'https://employee-app-backend.herokuapp.com',
    //APIURL: 'http://localhost:3000',
    blackListedUrls: ['/demographics/data', '/login/getuser', '/organization/getOrganization', '/employee/searchEmployee']
};

export const ApplicationConstants = {
    dateFormat: 'dd/MM/yyyy',
    Attachments: ['fitnessCopy', 'passportCopy', 'gopCopy', 'offerLetterCopy', 'ninCopy'],
    pendingStatus: '3',
    approvedStatus: '1',
    rejectedStatus: '2'
}

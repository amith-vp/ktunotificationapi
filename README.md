# ktunotificationapi
Rest API of KTU ( APJ Abdul Kalam Technological University) website Notifications.

# OPEN API : https://ktunotification.herokuapp.com or http://ktu.amith.ninja 

`GET` request to `http://ktu.amith.ninja`


 API to get last 10 notifications from http://ktu.edu.in/eu/core/announcements.htm.



## Sample Response 

```json
{
    "last_updated": "2021-08-04T16:52:07.153Z",
    "is_ktusite_online": true,
    "notifications": [{
        "date": "Mon Aug 02 00:00:00 IST 2021",
        "title": "Examination Centre change - B.Tech S8 Exam",
        "description": " It is hereby notified that the students appearing for B.Tech S8 (S) Exam Aug 2021 can apply for change of exam centre through student login in KTU portal from 06-08-2021, Friday to 08-08-2021, Sunday.",
        "links": [{
            "url_title": "Notification",
            "url": "https://ktu.edu.in/eu/att/attachments.htm?download=file&id=NNNZcKrNUALDlhpKrKbc4b2C6PQSJTfGx2c4iTCuWz4%3D&announcementId=1DSWCmhKJi94VznvF7kAtc1%2FPOVuTgtPh3JzhKrzvTM%3D&fileName=Notif-Centrechange-B.TechS8Ag21.pdf&downloadType=nNDt6dzJ%2BfnXQwzFnzgtuRUbGLtfsg1U1B0rZqbRytc%3D"
        }]
    }, {
        "date": "Mon Aug 02 00:00:00 IST 2021",
        "title": "Call for Proposals focused on Covid 19 | IEEE HAC",
        "description": " ",
        "links": [{
            "url_title": "Details",
            "url": "https://ktu.edu.in/eu/att/attachments.htm?download=file&id=2bSqayAbe5WmrVrFTBAPK87GN4Z4QaFm9Rz4x5bBFfQ%3D&announcementId=Ecl%2Fn1z2SJwD%2Bek6dcmQTH5EjDcsKAxC4iPBGjqdjLQ%3D&fileName=IEEE-HAC-SIGHT-Projects-CfP-COV2.pdf&downloadType=EBorSgqBrewIKUNzm5ZoEHMeqKiGOPkj6PfYq04n5jk%3D"
        }]
    }]
}
```
![api demo](https://media.discordapp.net/attachments/713261163936481343/872526255784886403/unknown.png)

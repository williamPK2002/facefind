
```markdown
src/
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── main.ts
├── analytics/
│   ├── analytics.controller.ts
│   ├── analytics.module.ts
│   └── analytics.service.ts
├── auth/
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   └── dto/
│       └── exchange-token.dto.ts
├── common/          (empty - placeholder for interceptors/decorators/filters/guards/interfaces/utils)
├── deliveries/
│   ├── deliveries.controller.ts
│   ├── deliveries.module.ts
│   ├── deliveries.service.ts
+│   └── dto/
+        └── trigger-deliveries.dto.ts
├── events/
│   ├── events.controller.ts
│   ├── events.module.ts
│   ├── events.service.ts
│   ├── dto/
│   │   ├── create-event.dto.ts
│   │   ├── update-event.dto.ts
│   │   └── upload-photo.dto.ts
│   └── interfaces/
│       └── event.interface.ts
├── faces/
│   ├── faces.controller.ts
│   ├── faces.module.ts
│   ├── faces.service.ts
│   └── dto/
│       ├── blur-face.dto.ts
│       └── create-face.dto.ts
├── persons/
│   ├── persons.controller.ts
│   ├── persons.module.ts
│   ├── persons.service.ts
│   └── dto/
│       ├── create-person.dto.ts
│       └── update-person.dto.ts
├── search/
│   ├── search.controller.ts
│   ├── search.module.ts
│   ├── search.service.ts
│   └── dto/
│       └── face-search.dto.ts
└── weaviate/
    └── weaviate.service.ts  (client wrapper to communicate with Weaviate)

Database-like entities (planned):
- events(id, name, time_start, time_end, privacy_mode, opt_in_required, owner_id)
- photos(id, event_id, url_original, url_web, taken_at, camera, exif_json, phash)
- deliveries(id, person_id, event_id, link_token, sent_via{email/line}, sent_at, open_at, click_at)
- abuse_reports(id, reporter_id, face_id/photo_id, reason, status)


- faces(id, photo_id, bbox, quality, embed[vector], person_id?, match_score, labeled_by{auto|human})
- persons(id, university_id?, display_name, consent_flags, gallery_embed[vector])

API endpoints (notes):


- POST   /events                  - create/update event (admin)
- POST   /events/:id/upload       - ingest (multipart or signed URL)
        event
        photo

- POST   /deliveries/trigger      - create/send links for person/event
        deliveries

- GET    /me/my-photos?event=:id  - personal album (requires opt-in)
- POST   /search/face             - query-by-face (image or embed)
- POST   /faces/:id/blur          - blur/hide a face                                - How to blur?
        face

- POST   /auth/oidc/exchange      - OIDC exchange flow (clarify where exchange token is placed)
- POST   /persons/:id/opt-out     - withdraw consent
        Person

- GET    /analytics/event/:id     - event analytics
        abuse_report

Need more research, and newer pathways. pathways that makes more sense!!

```

---
## ARCHIVE NOTE — 2025-10-31

This project was archived and moved to the bin by the owner on 2025-10-31.

Quick memory aid:
- Location: `c:\Users\asus\Desktop\SeniorProject\Project\cepf`
- Stack: NestJS application with a Weaviate integration (see `src/weaviate/weaviate.service.ts`).
- Local infra: `weaviate-docker/` contains a Docker Compose setup used for local Weaviate; the `.env` in that folder previously held an API key — rotate it if it was committed.
- To restore: copy the folder back, set environment variables `WEAVIATE_URL` and `WEAVIATE_API_KEY`, install Docker Desktop, `cd weaviate-docker` and `docker compose up -d`, then start the Nest app (`npm run start:dev`).

If you want me to move any assistant-created files into a `backup/` folder before you delete the project, say so and I will do it.

Entities - Properties - definition

🗓️ Event
id – unique ID for each event
name – event name
time_start – when the event starts
time_end – when the event ends
privacy_mode – whether the event is public or private
opt_in_required – if face search needs user consent
owner_id – admin or staff who owns the event

🖼️ Photo
id – unique ID for the photo
event_id – links the photo to its event
url_original – URL of the full-size image (S3/MinIO)
url_web – web-optimized image URL
taken_at – date/time the photo was taken
camera – camera model or source
exif_json – extra image metadata (EXIF data)
phash – perceptual hash to detect duplicates

👁️ Face
id – unique ID for the detected face
photo_id – which photo the face appears in
bbox – coordinates of the face in the photo [x_min, y_min, x_max, y_max]
quality – score showing how clear or usable the face is
embed – 512-D vector representing the face’s features
person_id – links the face to a known person (if matched)
match_score – similarity score when compared to known faces
labeled_by – who labeled it (auto by AI or human manually)

🔹 Each face record belongs to one photo.
🔹 A photo can have many faces.
🔹 The embed vector of this face is compared to other faces.embed and to persons.gallery_embed to find matches.
🔹 Once matched, the system retrieves the related photo using photo_id.

👤 Person
id – unique ID for the person
university_id – student or staff ID (optional)
display_name – person’s name
consent_flags – what the person has agreed to (opt-in/out)
gallery_embed – one or more reference vectors of this person’s face

📩 Delivery
id – unique ID for the delivery record
person_id – who received the link
event_id – which event the delivery is for
link_token – unique token for personal link
sent_via – how it was sent (email or LINE)
sent_at – when it was sent
open_at – when the user opened it
click_at – when the user clicked the link

🚨 Abuse Report
id – unique ID for the report
reporter_id – who reported it
face_id/photo_id – which photo or face was reported
reason – reason for the report
status – current review status (pending, resolved, etc.)

insightface/python-package/insightface/app/face_analysis.py
# 메일 브리핑 · 법적 검토 도우미

받은 메일을 자동으로 읽어 **요약 → 분석 → 법적 검토 → 대응 선택지(A/B/C) + 추천 → 답장 초안**까지
정리한 브리핑을 만들고, 본인 메일로 보내줍니다.

> ⚠️ AI가 작성하는 참고 자료이며 법률 자문을 대체하지 않습니다. 리스크가 높거나
> "변호사 상담 권장"으로 표시된 건은 반드시 전문가와 확인하세요.

## 브리핑에 들어가는 내용 (메일 1건당)

| 항목 | 내용 |
|---|---|
| 분류 · 긴급도 | 계약/분쟁/노무/세무/피싱 의심 등, 🔴긴급 ~ 🟢낮음 |
| 요약 · 핵심 포인트 | 누가, 무엇을, 언제까지 요구하는지 |
| ⏰ 기한 | 회신 기한, 이의제기 기간, 소멸시효 등 |
| 분석 | 발신자 의도, 유리/불리한 점, 놓치기 쉬운 문구 |
| 법적 검토 | 관련 법률·조항, 리스크 등급, 변호사 상담 필요 여부 |
| 대응 선택지 | 2~4개 선택지별 실행 방법·장점·단점·예상 결과, 추천안과 이유 |
| 답장 초안 | 추천안에 맞춘 회신 문안 |

메일은 **읽음 처리하지 않고**(읽기 전용) 가져오며, 메일 본문 속 지시문은 따르지 않도록 되어 있습니다.

## 설정 (최초 1회)

1. **Gmail 앱 비밀번호 발급**: Google 계정 → 보안 → 2단계 인증 켜기 → "앱 비밀번호" 생성
   (Gmail 설정 → 전달 및 POP/IMAP → IMAP 사용 확인)
2. **Claude API 키 발급**: https://console.anthropic.com
3. 설치:
   ```bash
   pip install -r requirements.txt
   cp .env.example .env   # 값 채우기
   ```

## 사용법

```bash
python email_advisor.py                 # 최근 1일, 안 읽은 메일 → reports/ 에 저장
python email_advisor.py --days 3 --all  # 최근 3일, 읽은 메일 포함
python email_advisor.py --send          # 브리핑을 내 메일로 발송
python email_advisor.py --eml samples/sample_notice.eml   # 예시 메일로 테스트
```

## 매일 아침 자동 받기 (GitHub Actions)

저장소 **Settings → Secrets and variables → Actions** 에 아래 값을 등록하면
매일 오전 7:52(KST)에 브리핑이 메일로 옵니다. (Actions 탭에서 수동 실행도 가능)

`ANTHROPIC_API_KEY`, `EMAIL_ADDRESS`, `EMAIL_APP_PASSWORD`, `REPORT_TO`(선택), `USER_CONTEXT`(선택)

> 저장소가 공개(public)라면 Actions 로그에 메일 제목이 출력될 수 있으니 **비공개 저장소**를 권장합니다.

## 비용

메일 1건 분석에 대략 100원 안팎입니다(메일 길이에 따라 다름). `MAX_EMAILS`로 하루 분석 개수를 제한할 수 있습니다.

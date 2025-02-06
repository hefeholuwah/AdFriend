function replaceAds() {
    const adElements = document.querySelectorAll("ins.adsbygoogle, [id^=div-gpt-ad], .ad, .advertisement")
  
    chrome.storage.sync.get(["enabled", "quote", "reminder"], (data) => {
      if (data.enabled ?? true) {
        const quote = data.quote ?? "Believe you can and you're halfway there."
        const reminder = data.reminder ?? "Have you done your burpees today?"
  
        adElements.forEach((adElement, index) => {
          const replacementContent = document.createElement("div")
          replacementContent.className = "adfriend-content"
          replacementContent.style.cssText = `
            background-color: #f0f4f8;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            padding: 16px;
            text-align: center;
            font-family: Arial, sans-serif;
          `
  
          if (index % 2 === 0) {
            replacementContent.innerHTML = `
              <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 8px; color: #2563eb;">Motivational Quote</h3>
              <p style="font-size: 16px; color: #4b5563;">${quote}</p>
            `
          } else {
            replacementContent.innerHTML = `
              <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 8px; color: #2563eb;">Activity Reminder</h3>
              <p style="font-size: 16px; color: #4b5563;">${reminder}</p>
            `
          }
  
          adElement.parentNode.replaceChild(replacementContent, adElement)
        })
      }
    })
  }
  
  replaceAds()
  
  // Observe DOM changes to replace dynamically loaded ads
  const observer = new MutationObserver(replaceAds)
  observer.observe(document.body, { childList: true, subtree: true })
  
  
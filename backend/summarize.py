from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
from string import punctuation
from heapq import nlargest

def summarize(text, len, lang):
    if(len<1):
        len = 1

    filler = stopwords.words(lang)
    wordToken = word_tokenize(text)
    sentenceToken = sent_tokenize(text)

    wordMap = dict()
    sentenceMap = dict()

    for word in wordToken:
        word = word.lower()
        if word not in filler and word not in punctuation:
            if word in wordMap:
                wordMap[word] = wordMap[word] + 1
            else:
                wordMap[word] = 1

    for word in wordMap:
        wordMap[word] = wordMap[word]/max(wordMap.values())

    for sentence in sentenceToken:
        for word in wordMap:
            if word in sentence.lower():
                if sentence in sentenceMap:
                    sentenceMap[sentence] = sentenceMap[sentence] + wordMap[word]
                else: 
                    sentenceMap[sentence] = wordMap[word]

    sentencesNeeded = nlargest(len, sentenceMap, key = sentenceMap.get)

    summary =""
    for sentence in sentencesNeeded:
        summary = summary + sentence + " "
    
    return summary 
